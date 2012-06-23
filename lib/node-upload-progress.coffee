url = require 'url'
formidable = require 'formidable'
Uploads = require './uploads'
Upload = require './upload'
fs = require 'fs'

# http://wiki.nginx.org/HttpUploadProgressModule#report_uploads
#
# the upload request hasn't been registered yet or is unknown:
# new Object({ 'state' : 'starting' })
#
# the upload request has ended:
# new Object({ 'state' : 'done' })
#
# the upload request generated an HTTP error
# new Object({ 'state' : 'error', 'status' : <error code> })
#
# the upload request is in progress:
# new Object({ 'state' : 'uploading', 'received' : <size_received>, 'size' : <total_size>})    }

class UploadHandler
	constructor: (@uploadDir=null)->
		@uploads = new Uploads
		
	configure: (func) ->
		func.call @
		
	formOnFile: (upload, field, file) ->
		upload.fileName = file.name
		if @uploadDir
			fs.rename file.path, "#{@uploadDir}/#{file.name}"
			
	formOnProgress: (upload, bytesReceived, bytesExpected) ->
		upload.updateProgress bytesReceived, bytesExpected

	upload: (req, res) ->
		query = url.parse(req.url, true).query
		form = new formidable.IncomingForm()
		@uploads.add query['X-Progress-ID']

		form.parse req, (err, fields, files) =>
			@uploads.remove query['X-Progress-ID']
			res.writeHead 200, 'Content-type': 'text/plain'
			res.end 'upload received'
		
		form.on 'file', (field, file) =>
			@formOnFile @uploads.get(query['X-Progress-ID']), field, file
		
		form.addListener 'progress' , (bytesReceived, bytesExpected) =>
			@formOnProgress @uploads.get(query['X-Progress-ID']), bytesReceived, bytesExpected

	progress: (req, res) ->
		query = url.parse(req.url, true).query
		res.writeHead 200, 'Content-type': 'application/json'
		upload = @uploads.get query['X-Progress-ID']
		res.end upload.toJSON()

module.exports.UploadHandler = UploadHandler
module.exports.Upload = Upload
module.exports.Uploads = Uploads
