(function() {
  var uploadProgress;

  uploadProgress = require('../../lib/node-upload-progress');

  describe('UploadHandler', function() {
    var $;
    $ = {};
    beforeEach(function() {
      return $.uploadHandler = new uploadProgress.UploadHandler;
    });
    return describe('configure', function() {
      return it('should call configure', function() {
        var dirName;
        dirName = "" + __dirname + "/uploads";
        $.uploadHandler.configure(function() {
          return this.uploadDir = dirName;
        });
        return $.uploadHandler.uploadDir.should.equal(dirName);
      });
    });
  });

}).call(this);
