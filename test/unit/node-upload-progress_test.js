(function() {
  var should, uploadProgress;

  uploadProgress = require('../../lib/node-upload-progress');

  should = require('should');

  describe('Upload', function() {
    var $;
    $ = {};
    beforeEach(function() {
      return $.upload = new uploadProgress.Upload;
    });
    describe('isDone', function() {
      it('should is done if received == expected', function() {
        $.upload.updateProgress(10, 10);
        return $.upload.isDone().should.be["true"];
      });
      it('should is not done if received < expected', function() {
        $.upload.updateProgress(1, 10);
        return $.upload.isDone().should.be["false"];
      });
      return it('should return JSON', function() {
        $.upload.updateProgress(1, 10);
        return $.upload.toJSON().should.equal('{"bytesReceived":1,"bytesExpected":10,"percent":10}');
      });
    });
    return describe('percent', function() {
      it('should return 100%', function() {
        $.upload.updateProgress(10, 10);
        return $.upload.percent().should.equal(100);
      });
      return it('should return 50%', function() {
        $.upload.updateProgress(5, 10);
        return $.upload.percent().should.equal(50);
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
      it('should create without upload', function() {
        var upload;
        upload = $.uploads.add(1);
        return should.exist(upload);
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
