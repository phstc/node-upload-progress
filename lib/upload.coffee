class Upload
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

	percent: ->
		parseInt (@bytesReceived * 100) / @bytesExpected, 10

	updateProgress: (bytesReceived, bytesExpected) ->
		@bytesReceived = bytesReceived
		@bytesExpected = bytesExpected

module.exports = Upload
