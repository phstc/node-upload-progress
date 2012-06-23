Upload = require './upload'

class Uploads
	constructor: ->
		@uploads = []

	add: (uuid, upload=(new Upload)) ->
		@uploads[uuid] = upload

	get: (uuid) ->
		@uploads[uuid]

	remove: (uuid) ->
		delete @uploads[uuid]

module.exports = Uploads
