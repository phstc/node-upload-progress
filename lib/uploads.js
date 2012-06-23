(function() {
  var Upload, Uploads;

  Upload = require('./upload');

  Uploads = (function() {

    function Uploads() {
      this.uploads = [];
    }

    Uploads.prototype.add = function(uuid, upload) {
      if (upload == null) upload = new Upload;
      return this.uploads[uuid] = upload;
    };

    Uploads.prototype.get = function(uuid) {
      return this.uploads[uuid];
    };

    Uploads.prototype.remove = function(uuid) {
      return delete this.uploads[uuid];
    };

    return Uploads;

  })();

  module.exports = Uploads;

}).call(this);
