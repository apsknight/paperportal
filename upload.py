from flask import Flask, render_template, request, redirect
from werkzeug import secure_filename
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import json, os

app = Flask(__name__)

@app.route('/')
def root():
	return render_template('contribute.html')
	
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
	# if request.method=='GET':
		# return('<form action="/uploader" method="post"><input type="submit" value="Send" /></form>')

	if request.method=='POST':
		dict = request.form
		for key in dict:
			print 'form key '+ key + ' ' + dict[key]
		f = request.files['file']
		filename = request.form.get("SubName") + '-' + request.form.get("Paper") + '-' + request.form.get("Year")
		f.save(secure_filename(filename))
		gauth = GoogleAuth()
		gauth.LoadCredentialsFile("mycreds.txt")
		if gauth.credentials is None:
			gauth.LocalWebserverAuth()
		elif gauth.access_token_expired:
			gauth.Refresh()
		else:
			gauth.Authorize()
		gauth.SaveCredentialsFile("mycreds.txt")

		drive = GoogleDrive(gauth)

		upload_file = drive.CreateFile()
		upload_file.SetContentFile(filename)
		upload_file.Upload()
		os.remove(filename)
		permission = upload_file.InsertPermission({
			'type':  'anyone'
			,'value': 'anyone'
			,'role':  'reader'
		})
		with open("data/qplist.json", "r") as qplist:
			data = json.load(qplist)
		data.append({
			"Schoool": request.form.get("School"),
			"SubName": request.form.get("SubName"),
			"SubCode": request.form.get("SubCode"),
			"Paper": request.form.get("Paper"),
			"Link": upload_file['alternateLink'],
			"Year": request.form.get("Year"),
		})
		with open("data/qplist.json", "w") as qplist:
			qplist.write(json.dumps(data))
		return redirect('/')
	else:
		return("ok")

if __name__ == '__main__':
   app.run(debug = True)