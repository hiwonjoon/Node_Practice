var http = require('http');
var jade = require('jade');
var fs = require('fs');

http.createServer(function(request,response) {
	fs.readFile('JadePage2.jade','utf8',function(error,data) {
		var fn = jade.compile(data);
		response.writeHead(200,{'Content-Type:':'text/html'});
		response.end(fn({name : 'RintIanTta', description:'Hello EJS WIth Node.js .. !'}));
	});
}).listen(52237);
