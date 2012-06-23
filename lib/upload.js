(function() {
  var Upload;

  Upload = (function() {

    function Upload(bytesReceived, bytesExpected) {
      this.bytesReceived = bytesReceived != null ? bytesReceived : 0;
      this.bytesExpected = bytesExpected != null ? bytesExpected : 0;
    }

    Upload.prototype.isDone = function() {
      return this.bytesReceived === this.bytesExpected;
    };

    Upload.prototype.isUploading = function() {
      return this.bytesReceived < this.bytesExpected;
    };

    Upload.prototype.toJSON = function() {
      return JSON.stringify({
        bytesReceived: this.bytesReceived,
        bytesExpected: this.bytesExpected,
        percent: this.percent()
      });
    };

    Upload.prototype.percent = function() {
      return parseInt((this.bytesReceived * 100) / this.bytesExpected, 10);
    };

    Upload.prototype.updateProgress = function(bytesReceived, bytesExpected) {
      this.bytesReceived = bytesReceived;
      return this.bytesExpected = bytesExpected;
    };

    return Upload;

  })();

  module.exports = Upload;

}).call(this);
