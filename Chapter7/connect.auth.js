//connect.auth.js
var fs = require('fs');
var connect = require('connect');

var id = 'wonjoon';
var password = 'abcd1234';

var server = connect.createServer();

server.use(connect.cookieParser());
server.use(connect.bodyParser());
server.use(connect.router(function (app) {
	app.get('/Login', function(request, response) {
		//console.log(request.cookies.auth);
		if(request.cookies.auth === 'true') {
			//console.log('asdf');
			response.writeHead(200, { 'Content-Type':'text/html' });
			response.end('<h1>Login Success</h1>');
		}
		else {
			//console.log('nnnn');
			fs.readFile('Login.htm', function(error, data) {
				response.writeHead(200,{'Content-Type':'text/html'});
				response.end(data);
			});
		}
	});
	app.post('/Login', function(request, response) {
		if(request.body.id === id && request.body.password === password) {
			//console.log('abcd');
			response.writeHead(302, {'Location': '/Login', 'Set-Cookie': ['auth = true'] });
			response.end();
		}
		else
		{
			//console.log('asdfsdfsdf');
			response.writeHead(200, {'Content-Type':'text/html'});
			response.end('<h1> Login FAIL</h1>');
		}
	});
} ));

server.listen(52273, function() { console.log('server running'); } );