url = require 'url'
formidable = require 'formidable'

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

class Upload
	constructor: (@bytesReceived=0, @bytesExpected=0) ->

	isDone: ->
		@bytesReceived == @bytesExpected

	isUploading: ->
		@bytesReceived < @bytesExpected

	toJSON: ->
		JSON.stringify
			bytesReceived: @bytesReceived
			bytesExpected: @bytesExpected
			percent: @percent()

	percent: ->
		parseInt (@bytesReceived * 100) / @bytesExpected, 10

	updateProgress: (bytesReceived, bytesExpected) ->
		@bytesReceived = bytesReceived
		@bytesExpected = bytesExpected

class Uploads
	constructor: ->
		@uploads = []

	add: (uuid, upload=(new Upload)) ->
		@uploads[uuid] = upload

	get: (uuid) ->
		@uploads[uuid]

	remove: (uuid) ->
		delete @uploads[uuid]

class UploadHandler
	constructor: ->
		@uploads = new Uploads

	upload: (req, res) ->
		query = url.parse(req.url, true).query;
		form = new formidable.IncomingForm()
		upload = @uploads.add query['X-Progress-ID']
		uploads = @uploads
		form.parse req, (err, fields, files) ->
			uploads.remove query['X-Progress-ID']
			res.writeHead 200, 'Content-type': 'text/plain'
			res.end('upload received')
		form.addListener 'progress' , (bytesReceived, bytesExpected) ->
			upload.updateProgress bytesReceived, bytesExpected

	progress: (req, res) ->
		query = url.parse(req.url, true).query;
		res.writeHead 200, 'Content-type': 'application/json'
		res.end @uploads.get(query['X-Progress-ID']).toJSON()

module.exports.UploadHandler = UploadHandler
module.exports.Upload = Upload
module.exports.Uploads = Uploads
