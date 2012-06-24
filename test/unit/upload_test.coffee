Upload = require '../../lib/upload'

describe 'Upload', ->
	$ = {}

	beforeEach ->
		$.upload = new Upload

	describe 'isDone', ->
		it 'should is done if received == expected', ->
			$.upload.updateProgress 10, 10
			$.upload.isDone().should.be.true

		it 'should is not done if received < expected', ->
			$.upload.updateProgress 1, 10
			$.upload.isDone().should.be.false

		it 'should return JSON', ->
			$.upload.updateProgress 1, 10
			$.upload.file = name: 'hello.txt', path: "#{__dirname}/hello.txt"
			$.upload.toJSON().should.equal '{"bytesReceived":1,"bytesExpected":10,"percent":10,"status":"uploading","fileName":"hello.txt","filePath":"' + __dirname + '/hello.txt"}'
			
		it 'should return JSON without file', ->
			$.upload.updateProgress 1, 10
			$.upload.toJSON().should.equal '{"bytesReceived":1,"bytesExpected":10,"percent":10,"status":"uploading"}'

	describe 'percent', ->
		it 'should return 100%', ->
			$.upload.updateProgress 10, 10
			$.upload.percent().should.equal 100			

		it 'should return 50%', ->
			$.upload.updateProgress 5, 10
			$.upload.percent().should.equal 50

		it 'should return 0 if bytesExpected is 0', ->
			$.upload.updateProgress 0, 0
			$.upload.percent().should.equal 0
			
	describe 'status', ->
		it 'should be done if percent 100 and fileName is present', ->
			$.upload.updateProgress 10, 10
			$.upload.file = name: 'hello.txt', path: "#{__dirname}/hello.txt"
			$.upload.status().should.equal 'done'
			
		it 'should be uploading if percent < 100', ->
			$.upload.updateProgress 5, 10
			$.upload.status().should.equal 'uploading'
			
		it 'should be starting if is not uploading or done', ->
			$.upload.updateProgress 10, 10
			$.upload.status().should.equal 'starting'
