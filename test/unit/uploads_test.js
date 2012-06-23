(function() {
  var Upload, Uploads, should;

  Uploads = require('../../lib/uploads');

  Upload = require('../../lib/upload');

  should = require('should');

  describe('Uploads', function() {
    var $;
    $ = {};
    beforeEach(function() {
      $.uploads = new Uploads;
      return $.upload = new Upload;
    });
    describe('add', function() {
      it('should add without upload', function() {
        var upload;
        upload = $.uploads.add(1);
        return should.exist(upload);
      });
      return it('should add and get a new upload', function() {
        $.uploads.add(1, $.upload);
        return $.uploads.get(1).should.equal($.upload);
      });
    });
    describe('get', function() {
      return it('should return nil if the upload does not exist', function() {
        return should.not.exist($.uploads.get(1));
      });
    });
    return describe('remove', function() {
      return it('should remove an upload', function(done) {
        $.uploads.add(1, $.upload);
        $.uploads.remove(1, 10);
        return setTimeout(function() {
          should.not.exist($.uploads.get(1));
          return done();
        }, 10);
      });
    });
  });

}).call(this);
