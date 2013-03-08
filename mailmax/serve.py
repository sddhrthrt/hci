from flask import Flask, render_template
app = Flask(__name__)

def get_mails(user=""):
    mails = [
                {"sub":"Hello", "frm":"Arathi", "time":"20m"},
                {"sub":"haha", "frm":"Siddhartha", "time":"18m"},
                {"sub":"Nono", "frm":"Suresh", "time":"15m"},
                {"sub":"Here", "frm":"Siddhartha", "time":"10m"},
                {"sub":"URGENT", "frm":"Arathi", "time":"2m"},
                ]
    if user:
        mails_list = []
        for mail in mails:
            if mail['frm']==user:
                mails_list += [mail]
        return mails_list
    return mails

@app.route('/')
def index(name='World'):
    mails = get_mails()
    users = list(set([ item['frm'] for item in mails ]))
    return render_template('index.html', users=users, mails=mails)

@app.route('/u/<user>')
def user(user=""):
    mails = get_mails(user) 
    return render_template('index.html', users=[user], mails=mails)

if __name__== '__main__':
    app.debug=True
    app.run()
