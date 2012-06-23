(function() {
  var Upload, UploadHandler, Uploads, formidable, url;

  url = require('url');

  formidable = require('formidable');

  Uploads = require('./uploads');

  Upload = require('./upload');

  UploadHandler = (function() {

    function UploadHandler() {
      this.uploads = new Uploads;
    }

    UploadHandler.prototype.upload = function(req, res) {
      var form, query, upload, uploads;
      query = url.parse(req.url, true).query;
      form = new formidable.IncomingForm();
      upload = this.uploads.add(query['X-Progress-ID']);
      uploads = this.uploads;
      form.parse(req, function(err, fields, files) {
        uploads.remove(query['X-Progress-ID']);
        res.writeHead(200, {
          'Content-type': 'text/plain'
        });
        return res.end('upload received');
      });
      return form.addListener('progress', function(bytesReceived, bytesExpected) {
        return upload.updateProgress(bytesReceived, bytesExpected);
      });
    };

    UploadHandler.prototype.progress = function(req, res) {
      var query;
      query = url.parse(req.url, true).query;
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      return res.end(this.uploads.get(query['X-Progress-ID']).toJSON());
    };

    return UploadHandler;

  })();

  module.exports.UploadHandler = UploadHandler;

  module.exports.Upload = Upload;

  module.exports.Uploads = Uploads;

}).call(this);
