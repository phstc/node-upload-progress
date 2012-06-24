(function() {
  var Upload;

  Upload = (function() {

    Upload.file = null;

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
        percent: this.percent(),
        status: this.status(),
        fileName: this.file ? this.file.name : void 0,
        filePath: this.file ? this.file.path : void 0
      });
    };

    Upload.prototype.status = function() {
      if (this.isDone() && this.file) return 'done';
      if (this.isUploading()) return 'uploading';
      return 'starting';
    };

    Upload.prototype.percent = function() {
      if (this.bytesExpected === 0) return 0;
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
