(function() {
  var Upload, Uploads;

  Upload = (function() {

    function Upload() {}

    Upload.prototype.isDone = function() {
      return this.bytesReceived === this.bytesExpected;
    };

    Upload.prototype.isUploading = function() {
      return this.bytesReceived < this.bytesExpected;
    };

    Upload.prototype.updateProgress = function(bytesReceived, bytesExpected) {
      this.bytesReceived = bytesReceived;
      return this.bytesExpected = bytesExpected;
    };

    return Upload;

  })();

  Uploads = (function() {

    function Uploads() {
      this.uploads = [];
    }

    Uploads.prototype.add = function(uuid, upload) {
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

  module.exports.Upload = Upload;

  module.exports.Uploads = Uploads;

}).call(this);
