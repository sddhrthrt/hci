import imaplib
import ConfigParser
import os
import re
import traceback
from pprint import pprint
import email

verbose = True

def get_configuration():
    # Read the config file
    config = ConfigParser.ConfigParser()
    config.read(['/var/www/hci/mailmax/gmail.config'])
    return config

def open_connection(config=""):
    if not config:
        if verbose: print 'Configuration missing'
        return
    # Connect to the server
    hostname = config.get('server', 'hostname')
    if verbose: print 'Connecting to', hostname
    connection = imaplib.IMAP4_SSL(hostname)

    # Login to our account
    username = config.get('account', 'username')
    password = config.get('account', 'password')
    if verbose: print 'Logging in as', username
    try:
        connection.login(username, password)
    except:
        print "Sorry, authentication failed."
        exit(-1)
    return connection

list_response_pattern = re.compile(r'\((?P<flags>.*?)\) "(?P<delimiter>.*)" (?P<name>.*)')

def parse_list_response(line):
    try:
        flags, delimiter, mailbox_name = list_response_pattern.match(line).groups()
    except TypeError:
        print "Couldn't regex-parse the response line:", line
        return
    mailbox_name = mailbox_name.strip('"')
    return (flags, delimiter, mailbox_name)


def process_mailboxes(c):
    #process all mail from connection 'c'
    code, data = c.list(directory="[Gmail]")

    if verbose: print 'Response code: ', code

    for line in data:
        try:
            flags, delimiter, mailbox_name = parse_list_response(line)
            print (flags, delimiter, mailbox_name)
            print c.status(mailbox_name, '(MESSAGES RECENT UIDNEXT UIDVALIDITY UNSEEN)')
        except TypeError:
            print "failed to process response:", line
   
def select_mailbox(box, c):
    if box:
        if verbose: print "Selecting mailbox: [READ ONLY]", box
        code, data = c.select(box, readonly=True)
        if code=="OK":
            data = int(data[0])
            print "There are %s messages in %s"%(data, box)
        else:
            print "Failed to select mailbox %s"%(box)

def get_mails_list(box, query, c):

    select_mailbox(box, c)
    print query
    typ, mail_ids = c.search(None, query)
    if verbose: print "Mailbox %s for %s:"%(box, query)
    if verbose: print typ, mail_ids
    if typ=="OK":
        return mail_ids
    else:
        return None

def fetch_mail(mail_id, c):
    typ, mail_data = c.fetch(mail_id, '(RFC822)')
    if typ=="OK":
        return mail_data

def print_mail(mail_data):
    for part in mail_data:
        if isinstance(part, tuple):
            msg = email.message_from_string(part[1])

            for header in [ 'to', 'from', 'subject' ]:
                print '%-8s %s\n'%(header.upper(), msg[header])
            for part in msg.walk():
                if part.get_content_type()=="text/plain":
                    print part.get_payload()

if __name__ == '__main__':
    config = get_configuration()
    c = open_connection(config)
    try:
        #code, data = c.list()
        inbox = config.get('account', 'inbox')
        sent = config.get('account', 'sent')
        person = config.get('account', 'otherguy')

        #mails = get_mails_list(inbox, '(FROM "%s")'%person, c)
        mails = get_mails_list(sent, '(TO "%s")'%person, c)

        if mails:
            for mail_id in mails[0].split()[-5:]:
                mail_data = fetch_mail(mail_id, c)
                save_mail(mail_data)
                #print_mail(mail_data)
        #else:
            #print "no mails found."
    except Exception as e:
        print e
        traceback.print_exc()
        print "sorry, connection failed to open"
    finally:
        c.logout()
    


