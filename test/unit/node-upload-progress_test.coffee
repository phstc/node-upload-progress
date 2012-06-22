uploadProgress = require '../../lib/node-upload-progress'

describe 'Upload', ->
    describe 'isDone', ->
        it 'should is done if received == expected', ->
            upload = new uploadProgress.Upload
            upload.updateProgress 10, 10
            upload.isDone().should.be.true
        it 'should is not done if received < expected', ->
            upload = new uploadProgress.Upload
            upload.updateProgress 1, 10
            upload.isDone().should.be.false
