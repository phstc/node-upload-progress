Upload = require './upload'

class Uploads
	constructor: ->
		@uploads = []

	add: (uuid, upload=(new Upload)) ->
		@uploads[uuid] = upload

	get: (uuid) ->
		@uploads[uuid]

	remove: (uuid, millisec=50000) ->
		uploads = @uploads 
		setTimeout ->
			delete uploads[uuid]
		, millisec

module.exports = Uploads
