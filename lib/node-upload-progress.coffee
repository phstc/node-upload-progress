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
	constructor: (@uploadDir=null, @onEnd=null) ->
		@uploads = new Uploads
		
	configure: (func) ->
		func.call @
		
	formOnFile: (upload, field, file) ->
		upload.file = file
		if @uploadDir
			fs.rename file.path, "#{@uploadDir}/#{file.name}"
			file.path = "#{@uploadDir}/#{file.name}"
	
	formOnProgress: (upload, bytesReceived, bytesExpected) ->
		upload.updateProgress bytesReceived, bytesExpected
	
	_onEnd: (req, res) ->
		res.writeHead 200, 'Content-type': 'text/plain'
		res.end 'upload received'

	upload: (req, res) ->
		query = url.parse(req.url, true).query
		form = new formidable.IncomingForm()
		
		@uploads.add query['X-Progress-ID']
		
		form.parse req, (err, fields, files) =>
			@uploads.remove query['X-Progress-ID']
			(@onEnd || @_onEnd)(req, res)
		
		form.on 'file', (field, file) =>
			@formOnFile @uploads.get(query['X-Progress-ID']), field, file
		
		form.addListener 'progress' , (bytesReceived, bytesExpected) =>
			@formOnProgress @uploads.get(query['X-Progress-ID']), bytesReceived, bytesExpected

	progress: (req, res) ->
		query = url.parse(req.url, true).query
		upload = @uploads.get query['X-Progress-ID']
		if upload
			res.writeHead 200, 'Content-type': 'application/json'
			res.end upload.toJSON()
		else
			res.writeHead 404, 'Content-type': 'text/plain'
			res.end 'not found'

module.exports.UploadHandler = UploadHandler
