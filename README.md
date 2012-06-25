It's a Node.js module to handle upload and upload-progress.

##Instal

    $ npm install node-upload-progress

or

    # package.json
    # ...
    "dependencies": {
      "node-upload-progress": "latest"
    }
    # ...
    
    $ npm install

##Usage

###Simple

    var app = require('http');
    var uploadProgress = require('node-upload-progress');
    
    uploadHandler = new uploadProgress.UploadHandler;

The ```uploadHandler.uploadDir``` is the path where the files will be saved. Without this configuration the files will be saved in a path based on ```process.env.TMP```.

    uploadHandler.configure(function() {
      this.uploadDir = __dirname + '/uploads';
    });
    
    app.createServer(function(req, res) {
      if (req.url === '/upload') {
        uploadHandler.upload(req, res);
        return;
      }
      # ...
    }

####Custom response body

Configuring the ```uploadHandler.onEnd = customOnEndHandler```, you can write your own response body.

    # ...
    uploadHandler.configure(function() {
      this.uploadDir = "" + __dirname + "/uploads";
      this.onEnd = customOnEndHandler;
    });
    
    function customOnEndHandler(req, res){      
      res.writeHead 200, {'Content-Type': 'text/plain'}
      res.end('Upload received');
    }
    
    app.createServer(function(req, res) {
      if (req.url === '/upload') {
        uploadHandler.upload(req, res);
        return;
      }
      # ...
    }

See a full example at [examples/simple](https://github.com/phstc/node-upload-progress/tree/master/examples/simple).

##Progress

If you want to use an upload progress similar to [Nginx Upload Progress Module](http://wiki.nginx.org/HttpUploadProgressModule), you can easily do it using the progress handler.

    # ...
    app.createServer(function(req, res) {
      if (req.url.match(/\/upload\?X\-Progress\-ID=.+/)) {
        uploadHandler.upload(req, res);
        return;
      } else if (req.url.match(/\/progress\?X\-Progress\-ID=.+/)) {
        uploadHandler.progress(req, res);
        return;
      }
      # ...
    }

###The view

#### The Javascript

    <script>
    	$(function(){
    		$('#form_upload').submit(function(){
    			var xProgressID = guidGenerator();
    			$(this).attr('action', '/upload?X-Progress-ID=' + xProgressID);
    			var uploadIntervalID = setInterval(function(){
    				$.get('/progress?X-Progress-ID=' + xProgressID, function(data){
    					if(data.status === 'done'){
    						clearInterval(uploadIntervalID);
    					}
    					updateViewUploadStatus(data);
    				}).error(function(){clearInterval(uploadIntervalID)});
    			}, 250);
    			return true;
    		});
    		
    		function updateViewUploadStatus(data){
    			# ...
    		}
    		
    		// http://stackoverflow.com/a/105074/464685
    		function guidGenerator() {
    			return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    		}
    		
    		function S4() {
    			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    		}
    	});
    </script>

####The HTML

    # ...
    <form action="/upload?X-Progress-ID=1" enctype="multipart/form-data" method="post" id="form_upload" target="iframe_upload">
    	<p>
    		<label>File</label><br/>
    		<input type="file" name="upload" id="upload"><br>
    	</p>
    	<p>
    		<input type="submit" value="Upload">
    	</p>
    </form>
    <iframe id="iframe_upload" name="iframe_upload"></iframe>
    # ...

###The progress status

The upload request hasn't been registered yet or is unknown:

    HTTP 404 Not Found

The upload request has ended:

    {"bytesReceived":N,"bytesExpected":N,"percent":100,"status":"done","fileName":"filename.txt","filePath":"uploadDir/filename.txt"}

The upload request is in progress:

    {"bytesReceived":N,"bytesExpected":N,"percent":N,"status":"uploading"}

See a full example at [examples/progress](https://github.com/phstc/node-upload-progress/tree/master/examples/progress).

##Running it

###Simple example

    $ make simple

Then 

    open http://localhost:8080

###Progress example

    $ make progress

Then 

    open http://localhost:8080

###Test suite

    $ make test
