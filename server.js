// add mimes

var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res) {

  var purl = url.parse(req.url, true);
  if (purl.pathname == '/hello') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello ' + (purl.query.name||"world") ); // notice i use querystring arguments here http://127.0.0.1:1337/hello?name=me!
  } else {
    fs.exists(__dirname + purl.pathname, function(exists) {
      if (exists) {

        var extention = purl.pathname.match(/\..+$/)[0];
        var mime = {
          '.js': 'text/javascript; charset=UTF-8',
          '.txt': 'text/plain; charset=UTF-8',
          '.html': 'text/html; charset=UTF-8',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.jpg': 'image/jpeg'
        }

        res.writeHead(200, {'Content-Type': mime[extention]});
        fs.readFile(__dirname + purl.pathname, function(err, data) {
          if (err) throw err;
          res.end(data);
        });

      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('File Not Found');
      }
    });

  }

}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
