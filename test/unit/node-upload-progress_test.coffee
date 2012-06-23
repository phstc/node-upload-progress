uploadProgress = require '../../lib/node-upload-progress'
should = require 'should'

describe 'Upload', ->
    describe 'isDone', ->
        $ = {}	
        beforeEach ->
            $.upload = new uploadProgress.Upload

        it 'should is done if received == expected', ->
            $.upload.updateProgress 10, 10
            $.upload.isDone().should.be.true
        it 'should is not done if received < expected', ->
            $.upload.updateProgress 1, 10
            $.upload.isDone().should.be.false
        it 'should return JSON', ->
            $.upload.updateProgress 1, 10
            $.upload.toJSON().should.equal '{"bytesReceived":1,"bytesExpected":10}'


describe 'Uploads', ->
    describe 'add/get/delete', ->
        $ = {}
        beforeEach ->
            $.uploads = new uploadProgress.Uploads
            $.upload = new uploadProgress.Upload
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
