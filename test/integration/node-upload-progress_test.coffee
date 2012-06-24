app = require 'http'
request = require 'superagent'
uploadProgress = require '../../lib/node-upload-progress'
	
describe 'app', ->	
	describe 'simple upload', ->
		$ = {}
		before ->
			uploadHandler = new uploadProgress.UploadHandler
			$.server = app.createServer (req, res) ->
				uploadHandler.upload req, res
			$.server.listen(8080)
		
		after ->
			$.server.close()
		
		it 'should upload a file', (done) ->
			req = request.post 'http://localhost:8080/upload'
			part = req.part()
			part.set 'Content-Type', 'text/plain'
			part.set 'Content-Disposition', 'attachment; filename="hello.txt"'
			part.write 'hello world'
			req.end (res) ->
				res.should.have.status 200
				res.text.should.equal 'upload received'
				done()
	
	describe 'simple upload with onEnd', ->
		$ = {}
		before ->
			uploadHandler = new uploadProgress.UploadHandler
			uploadHandler.configure ->
				this.onEnd = (req, res)->
					res.writeHead 200, 'Content-type': 'text/plain'
					res.end 'awesome upload received'
			$.server = app.createServer (req, res) ->
				uploadHandler.upload req, res
			$.server.listen(8080)
		
		after ->
			$.server.close()

		it 'should response awesome upload received', (done) ->
			req = request.post 'http://localhost:8080/upload'
			part = req.part()
			part.set 'Content-Type', 'text/plain'
			part.set 'Content-Disposition', 'attachment; filename="hello.txt"'
			part.write 'hello world'
			req.end (res) ->
				res.should.have.status 200
				res.text.should.equal 'awesome upload received'
				done()
	
	describe 'progress', ->
		$ = {}
		before ->
			# uploadHandler = new uploadProgress.UploadHandler
			# $.server = app.createServer (req, res) ->
			# 	if req.url.match /\/upload\?X\-Progress\-ID=.+/
			# 		uploadHandler.upload req, res
			# 	else if req.url.match /\/progress\?X\-Progress\-ID=.+/
			# 		uploadHandler.progress req, res
			# $.server.listen(8080)

		after ->
			# $.server.close()

		it 'should return starting if not found', ->
			# req = request.get 'http://localhost:8080/progress?X-Progress-ID=1'
			# req.end (res) ->
			# 	res.should.have.status 404
			# 	res.text.should.equal 'not found'

