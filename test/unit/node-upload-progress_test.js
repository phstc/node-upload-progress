(function() {
  var should, uploadProgress;

  uploadProgress = require('../../lib/node-upload-progress');

  should = require('should');

  describe('Upload', function() {
    return describe('isDone', function() {
      var $;
      $ = {};
      beforeEach(function() {
        return $.upload = new uploadProgress.Upload;
      });
      it('should is done if received == expected', function() {
        $.upload.updateProgress(10, 10);
        return $.upload.isDone().should.be["true"];
      });
      return it('should is not done if received < expected', function() {
        $.upload.updateProgress(1, 10);
        return $.upload.isDone().should.be["false"];
      });
    });
  });

  describe('Uploads', function() {
    return describe('add/get/delete', function() {
      var $;
      $ = {};
      beforeEach(function() {
        $.uploads = new uploadProgress.Uploads;
        return $.upload = new uploadProgress.Upload;
      });
      it('should add and get a new upload', function() {
        $.uploads.add(1, $.upload);
        return $.uploads.get(1).should.equal($.upload);
      });
      it('should return nil if the upload does not exist', function() {
        return should.not.exist($.uploads.get(1));
      });
      return it('should remove an upload', function() {
        $.uploads.add(1, $.upload);
        $.uploads.remove(1);
        return should.not.exist($.uploads.get(1));
      });
    });
  });

}).call(this);
