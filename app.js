const Engine = require('./server/engine');

var express = require('express');
var app = express();
var Serv = require('http').Server(app);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

Serv.listen(2000);


console.log('Server started');


new Engine.Entity(0, 500, 1000, 50, {isStatic : true});


var SOCKET_LIST = {};

var io = require('socket.io')(Serv, {});
io.sockets.on('connection', function(socket){
	console.log('socket connection');
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;

	socket.player = new Engine.Player(socket.id);

	socket.on('disconnect', function(){
		socket.player.destroy();
	});
});

setInterval(function(){
	Engine.Entity.Update();
	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		
		socket.emit('render', Engine.Entity.GetRenderData());
	}
}, 1000 / 60);
