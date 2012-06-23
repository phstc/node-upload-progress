app = require 'http'
fs = require 'fs'
uploadProgress = require '../../lib/node-upload-progress'
uploadHandler = new uploadProgress.UploadHandler

uploadHandler.configure ->
	this.uploadDir = "#{__dirname}/uploads"

app.createServer((req, res) ->
	if req.url == '/upload'
		uploadHandler.upload req, res
	else
		fs.readFile "#{__dirname}/index.html", (err, data) ->
			res.writeHead 200, {'Content-Type': 'text/html'}
			res.write data.toString()
			res.end()
).listen(8080)

console.log 'Server running at http://localhost:8080/'
	