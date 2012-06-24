(function() {
  var Upload, UploadHandler, Uploads, formidable, fs, url;

  url = require('url');

  formidable = require('formidable');

  Uploads = require('./uploads');

  Upload = require('./upload');

  fs = require('fs');

  UploadHandler = (function() {

    function UploadHandler(uploadDir, onEnd) {
      this.uploadDir = uploadDir != null ? uploadDir : null;
      this.onEnd = onEnd != null ? onEnd : null;
      this.uploads = new Uploads;
    }

    UploadHandler.prototype.configure = function(func) {
      return func.call(this);
    };

    UploadHandler.prototype.formOnFile = function(upload, field, file) {
      upload.file = file;
      if (this.uploadDir) {
        fs.rename(file.path, "" + this.uploadDir + "/" + file.name);
        return file.path = "" + this.uploadDir + "/" + file.name;
      }
    };

    UploadHandler.prototype.formOnProgress = function(upload, bytesReceived, bytesExpected) {
      return upload.updateProgress(bytesReceived, bytesExpected);
    };

    UploadHandler.prototype._onEnd = function(req, res) {
      res.writeHead(200, {
        'Content-type': 'text/plain'
      });
      return res.end('upload received');
    };

    UploadHandler.prototype.upload = function(req, res) {
      var form, query,
        _this = this;
      query = url.parse(req.url, true).query;
      form = new formidable.IncomingForm();
      this.uploads.add(query['X-Progress-ID']);
      form.parse(req, function(err, fields, files) {
        _this.uploads.remove(query['X-Progress-ID']);
        if (_this.onEnd) {
          return _this.onEnd(req, res);
        } else {
          return _this._onEnd(req, res);
        }
      });
      form.on('file', function(field, file) {
        return _this.formOnFile(_this.uploads.get(query['X-Progress-ID']), field, file);
      });
      return form.addListener('progress', function(bytesReceived, bytesExpected) {
        return _this.formOnProgress(_this.uploads.get(query['X-Progress-ID']), bytesReceived, bytesExpected);
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

}).call(this);
