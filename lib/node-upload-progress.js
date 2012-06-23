(function() {
  var Upload, UploadHandler, Uploads, formidable, url;

  url = require('url');

  formidable = require('formidable');

  Upload = (function() {

    function Upload(bytesReceived, bytesExpected) {
      this.bytesReceived = bytesReceived != null ? bytesReceived : 0;
      this.bytesExpected = bytesExpected != null ? bytesExpected : 0;
    }

    Upload.prototype.isDone = function() {
      return this.bytesReceived === this.bytesExpected;
    };

    Upload.prototype.isUploading = function() {
      return this.bytesReceived < this.bytesExpected;
    };

    Upload.prototype.toJSON = function() {
      return JSON.stringify({
        bytesReceived: this.bytesReceived,
        bytesExpected: this.bytesExpected,
        percent: this.percent()
      });
    };

    Upload.prototype.percent = function() {
      return parseInt((this.bytesReceived * 100) / this.bytesExpected, 10);
    };

    Upload.prototype.updateProgress = function(bytesReceived, bytesExpected) {
      this.bytesReceived = bytesReceived;
      return this.bytesExpected = bytesExpected;
    };

    return Upload;

  })();

  Uploads = (function() {

    function Uploads() {
      this.uploads = [];
    }

    Uploads.prototype.add = function(uuid, upload) {
      if (upload == null) upload = new Upload;
      return this.uploads[uuid] = upload;
    };

    Uploads.prototype.get = function(uuid) {
      return this.uploads[uuid];
    };

    Uploads.prototype.remove = function(uuid) {
      return delete this.uploads[uuid];
    };

    return Uploads;

  })();

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
