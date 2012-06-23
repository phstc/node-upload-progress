(function() {
  var Upload, UploadHandler, Uploads, formidable, fs, url;

  url = require('url');

  formidable = require('formidable');

  Uploads = require('./uploads');

  Upload = require('./upload');

  fs = require('fs');

  UploadHandler = (function() {

    function UploadHandler(uploadDir) {
      this.uploadDir = uploadDir != null ? uploadDir : null;
      this.uploads = new Uploads;
    }

    UploadHandler.prototype.configure = function(func) {
      return func.call(this);
    };

    UploadHandler.prototype.upload = function(req, res) {
      var form, query, uploadDir, uploads;
      query = url.parse(req.url, true).query;
      form = new formidable.IncomingForm();
      this.uploads.add(query['X-Progress-ID']);
      uploads = this.uploads;
      form.parse(req, function(err, fields, files) {
        uploads.remove(query['X-Progress-ID']);
        res.writeHead(200, {
          'Content-type': 'text/plain'
        });
        return res.end('upload received');
      });
      uploadDir = this.uploadDir;
      form.on('file', function(field, file) {
        console.log(uploadDir);
        if (uploadDir) {
          return fs.rename(file.path, "" + uploadDir + "/" + file.name);
        }
      });
      return form.addListener('progress', function(bytesReceived, bytesExpected) {
        return uploads.get(query['X-Progress-ID']).updateProgress(bytesReceived, bytesExpected);
      });
    };

    UploadHandler.prototype.progress = function(req, res) {
      var query, upload;
      query = url.parse(req.url, true).query;
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      upload = this.uploads.get(query['X-Progress-ID']);
      return res.end(upload.toJSON());
    };

    return UploadHandler;

  })();

  module.exports.UploadHandler = UploadHandler;

  module.exports.Upload = Upload;

  module.exports.Uploads = Uploads;

}).call(this);
