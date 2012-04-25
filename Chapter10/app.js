//app.js
//socket.io.server.js
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(request, response) {
	fs.readFile('AppUserPage.html', function(error, data) {
		response.writeHead(200, {'Content-Type':'text/html'});
		response.end(data);
	});
}).listen(52273);

var io = socketio.listen(server);

io.set('log level', 2);
io.sockets.on('connection', function(socket) {
	socket.on('setname', function(data) {
		socket.set('name', data);
	});
	socket.on('getname', function() {
		socket.get('name',function(error,data) {
			socket.emit('responsename',data);
		});
	});
});
	