class Upload
	@file = null
	
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
			status: @status()
			fileName: @file.name if @file
			filePath: @file.path if @file

	status: ->
		return 'done' if @isDone() and @file
		return 'uploading' if @isUploading()
		'starting'

	percent: ->
		return 0 if @bytesExpected == 0
		parseInt (@bytesReceived * 100) / @bytesExpected, 10

	updateProgress: (bytesReceived, bytesExpected) ->
		@bytesReceived = bytesReceived
		@bytesExpected = bytesExpected

module.exports = Upload
