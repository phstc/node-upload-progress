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

    Uploads.prototype.remove = function(uuid, millisec) {
      var uploads;
      if (millisec == null) millisec = 50000;
      uploads = this.uploads;
      return setTimeout(function() {
        return delete uploads[uuid];
      }, millisec);
    };

    return Uploads;

  })();

  module.exports = Uploads;

}).call(this);
