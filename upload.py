from flask import Flask, render_template, request, redirect
from werkzeug import secure_filename
from pydrive.auth import GoogleAuth

# app.config['UPLOAD_FOLDER'] = '/'
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
		gauth = GoogleAuth()
		gauth.LocalWebserverAuth() # Creates local webserver and auto handles authentication.
		# f.save(secure_filename(f.filename))
		return redirect('/')
	else:
		return("ok")
	# print 'I am here'
	# print request.method
	# name = request.args['School']
	# print name
	# print 'here'
		# print f
	# return redirect('/')
      
    #   f.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(f.filename))
    #   return 'file uploaded successfully'
    #   print 'Done!'
		
if __name__ == '__main__':
   app.run(debug = True)