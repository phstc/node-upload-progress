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

    isDone: ->
        @bytesReceived == @bytesExpected

    isUploading: ->
        @bytesReceived < @bytesExpected

    updateProgress: (bytesReceived, bytesExpected) ->
        @bytesReceived = bytesReceived
        @bytesExpected = bytesExpected

class Uploads
    constructor: ->
        @uploads = []

    add: (uuid, upload) ->
        @uploads[uuid] = upload

    get: (uuid) ->
        @uploads[uuid]

    remove: (uuid) ->
        delete @uploads[uuid]

module.exports.Upload = Upload
module.exports.Uploads = Uploads
