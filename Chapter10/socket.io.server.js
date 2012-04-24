//socket.io.server.js
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(request, response) {
	fs.readFile('HTMLPage.html', function(error, data) {
		response.writeHead(200, {'Content-Type':'text/html'});
		response.end(data);
	});
}).listen(52273);

var io = socketio.listen(server);
var socket_to_session = [];

io.set('log level', 2);
io.sockets.on('connection', function(socket) {
	console.log('connected. ip : ' + socket.handshake.address.address);
	socket.on('client_says', function(data) {
		if(data === 'exit')
			socket.disconnect('unauthorized');
		else
			socket.emit('server_says', data);
	});
	socket.on('disconnect',function() {
		console.log('disconnected socket.');
	});
	socket.on('anything', function(data) {
		console.log('anything : ' + data );
	});
});
	