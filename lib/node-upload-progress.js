(function() {
  var Upload;

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

  module.exports.Upload = Upload;

}).call(this);
