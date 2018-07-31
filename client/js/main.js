var socket = io();

var canvas = document.createElement('canvas');
document.body.insertBefore(canvas, null);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

socket.on('render', function(entities){
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	for(var i in entities){
		var entity = entities[i];
		ctx.strokeRect(entity.x, entity.y, entity.width, entity.height);
	}
});
