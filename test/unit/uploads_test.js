(function() {
  var Upload, Uploads, should;

  Uploads = require('../../lib/uploads');

  Upload = require('../../lib/upload');

  should = require('should');

  describe('Uploads', function() {
    return describe('add/get/delete', function() {
      var $;
      $ = {};
      beforeEach(function() {
        $.uploads = new Uploads;
        return $.upload = new Upload;
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
