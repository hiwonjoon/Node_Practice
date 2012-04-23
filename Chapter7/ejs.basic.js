var http = require('http');
var ejs = require('ejs');
var fs = require('fs');

http.createServer(function (request,response) {
	fs.readFile('EJSPage.ejs', 'utf8', function(error, data)
		{
			response.writeHead(200,{'Content-Type':'text/html'});
			response.end(ejs.render(data));
		});
}).listen(52273);
