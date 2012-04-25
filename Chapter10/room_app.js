//room_app.js
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(request, response) {
	fs.readFile('RoomAppUserPage.html', function(error, data) {
		response.writeHead(200, {'Content-Type':'text/html'});
		response.end(data);
	});
}).listen(52273);

var io = socketio.listen(server);

io.set('log level', 2);
io.sockets.on('connection', function(socket) {
	socket.on('join', function(data) {
		socket.join(data);
		socket.join('global');
		socket.set('room',data);
	});
	socket.on('message', function(data) {
		socket.get('room', function(error,room) {
			io.sockets.in(room).emit('message', data);
		});
	});
	socket.on('shout', function(data) {
		io.sockets.in('global').emit('message', data);
	});
});
	