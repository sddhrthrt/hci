from flask import Flask, render_template, _app_ctx_stack, redirect
from sqlite3 import dbapi2 as sqlite3
import json

DATABASE = '/var/www/hci/mailmax/mailbox.db'

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('FLASKR_SETTINGS', silent=True)



def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    top = _app_ctx_stack.top
    if not hasattr(top, 'sqlite_db'):
        sqlite_db = sqlite3.connect(app.config['DATABASE'])
        sqlite_db.row_factory = sqlite3.Row
        top.sqlite_db = sqlite_db

    return top.sqlite_db


@app.teardown_appcontext
def close_db_connection(exception):
    """Closes the database again at the end of the request."""
    top = _app_ctx_stack.top
    if hasattr(top, 'sqlite_db'):
        top.sqlite_db.close()

class mailbox:

    def get_mails(self, user=""):
        db = get_db()
        cur = db.execute('select * from mb order by id desc')
        self.mails = cur.fetchall()
        if user:
            mails_list = []
            for mail in self.mails:
                if mail['frm']==user:
                    mails_list += [mail]
            return mails_list
        return self.mails

    def del_mail(self, id=""):
        if id==None:
            return 
        db = get_db()
        cur = db.execute('delete from mb where id=?', id)
        db.commit()
        print cur
        return
    def get_auth(self, id=""):
        if id=="" or id=="None":
            return
        db = get_db()
        print id
        sender = db.execute('select frm from mb where id=?', [id])
        sender = sender.fetchall()[0][0]
        print sender
        return sender
        

mb = mailbox()

@app.route('/')
def index(name='World'):
    mails = mb.get_mails()
    users = list(set([ item['frm'] for item in mails ]))
    return render_template('index.html', users=users, mails=mails)

@app.route('/u/<user>')
def user(user=""):
    mails = mb.get_mails(user) 
    return render_template('index.html', users=[user], mails=mails)

@app.route('/d/<id>')
def delete(id=None):
    print id
    mb.del_mail(id)
    return 'True' 

@app.route('/conv/<id>')
def conv(id=None):
    if(id):
        sender = mb.get_auth(id)
        return redirect('/u/'+sender)
    else:
        return ""

if __name__== '__main__':
    app.debug=True
    app.run('0.0.0.0')
