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
			$.upload.toJSON().should.equal '{"bytesReceived":1,"bytesExpected":10,"percent":10}'

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
