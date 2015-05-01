var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server)
	chatnames = [];

app.use(express.static(__dirname + '/public'));

server.listen(3000);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, callback){
		if (chatnames.indexOf(data) != -1){
			callback(false);
		} else{
			callback(true);
			socket.chatname = data;
			chatnames.push(socket.chatname);
			io.sockets.emit('usernames', chatnames);
		}
	});

	socket.on('send message', function(data){
		io.sockets.emit('new message', {message: data, chatname: socket.chatname});
	});
	
	socket.on('disconnect', function(data){
		if(!socket.chatname) return;
		chatnames.splice(chatnames.indexOf(socket.chatname), 1);
		io.sockets.emit('usernames', chatnames);
	});
});