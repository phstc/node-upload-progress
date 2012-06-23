(function() {
  var Upload;

  Upload = require('../../lib/upload');

  describe('Upload', function() {
    var $;
    $ = {};
    beforeEach(function() {
      return $.upload = new Upload;
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

}).call(this);
