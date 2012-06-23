uploadProgress = require '../../lib/node-upload-progress'

describe 'UploadHandler', ->
	$ = {}
	beforeEach ->
		$.uploadHandler = new uploadProgress.UploadHandler
		
	describe 'configure', ->
		it 'should call configure', ->
			dirName = "#{__dirname}/uploads"
			$.uploadHandler.configure ->
				this.uploadDir = dirName
			$.uploadHandler.uploadDir.should.equal dirName
