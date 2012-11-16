var uploadProgress = require('node-upload-progress')
, uploadHandler = new uploadProgress.UploadHandler;

function customOnEndHandler(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Upload received');
}

uploadHandler.configure(function() {
  this.uploadDir = 'uploads';
  this.onEnd = customOnEndHandler;
});

/* VIEW FORM */
var upload = function (req, res) {
  res.render('index.html');
}

/* UPLOAD ACTION */
var doUpload = function (req, res) {
  uploadHandler.upload(req, res)
}

/* PROGRESS VIEW */
var progress = function (req, res) {
  uploadHandler.progress(req, res)
}

var express = require('express');
var app = express();

app.engine('html', require('ejs').renderFile);

app.post('/upload', doUpload);
app.get('/', upload);
app.get('/progress', progress);


app.listen(3000);
console.log('Listening on port 3000');
