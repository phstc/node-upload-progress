Uploads = require '../../lib/uploads'
Upload = require '../../lib/upload'
should = require 'should'

describe 'Uploads', ->
	$ = {}

	beforeEach ->
		$.uploads = new Uploads
		$.upload = new Upload

	describe 'add', ->
		it 'should add without upload', ->
			upload = $.uploads.add 1
			should.exist upload

		it 'should add and get a new upload', ->
			$.uploads.add 1, $.upload
			$.uploads.get(1).should.equal $.upload
			
		it 'should add undefined', ->
			# undefined uuid occurs when X-Progress-ID is not passed in the querystring
			upload = $.uploads.add
			should.exist upload

	describe 'get', ->
		it 'should return nil if the upload does not exist', ->
			should.not.exist $.uploads.get(1)

	describe 'remove', ->
		it 'should remove an upload', (done) ->
			$.uploads.add 1, $.upload
			$.uploads.remove 1, 10
			setTimeout -> 
				should.not.exist $.uploads.get(1)
				done()
			, 10