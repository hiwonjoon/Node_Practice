//session-middleware.js
var connect = require('connect');

var server = connect.createServer();

server.use(connect.cookieParser());
server.use(connect.session({secret:'sercret'}));
server.use(function(request,response) {
	var output = '';
	output += '<p>Cookies: ' + JSON.stringify(request.cookies) + '</p>';
	output += '<h1>Session: ' + JSON.stringify(request.session) + '</h1>';
	
	response.writeHead(200,{'Content-Type':'text/html'});
	response.end(output);
	
	
	//response.session.now = (new Date()).toUTCString();
});

server.listen(52273, function() { console.log('server listening'); });