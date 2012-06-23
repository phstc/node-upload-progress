Uploads = require '../../lib/uploads'
Upload = require '../../lib/upload'

should = require 'should'

describe 'Uploads', ->
    describe 'add/get/delete', ->
        $ = {}
        beforeEach ->
            $.uploads = new Uploads
            $.upload = new Upload
        it 'should create without upload', ->
            upload = $.uploads.add 1
            should.exist upload
        it 'should add and get a new upload', ->
            $.uploads.add 1, $.upload
            $.uploads.get(1).should.equal $.upload
        it 'should return nil if the upload does not exist', ->
            should.not.exist $.uploads.get(1)
        it 'should remove an upload', ->
            $.uploads.add 1, $.upload
            $.uploads.remove 1
            should.not.exist $.uploads.get(1)