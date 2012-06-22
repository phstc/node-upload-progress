(function() {
  var uploadProgress;

  uploadProgress = require('../../lib/node-upload-progress');

  describe('Upload', function() {
    return describe('isDone', function() {
      it('should is done if received == expected', function() {
        var upload;
        upload = new uploadProgress.Upload;
        upload.updateProgress(10, 10);
        return upload.isDone().should.be["true"];
      });
      return it('should is not done if received < expected', function() {
        var upload;
        upload = new uploadProgress.Upload;
        upload.updateProgress(1, 10);
        return upload.isDone().should.be["false"];
      });
    });
  });

}).call(this);
