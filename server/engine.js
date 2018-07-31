var Matter = require('matter-js');

var engine = Matter.Engine.create();
setInterval(function(){ 
	Matter.Engine.update(engine); 
}, 1000 / 60);


var Entities = [];
var Entity = function(x, y, width, height, options = {}){
	this.index = Entities.length;

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	var centerX = x + width / 2;
	var centerY = y + height / 2;

	this.physical = Matter.Bodies.rectangle(
		centerX, centerY, 
		width, height, 
		options
	);

	Matter.World.add(engine.world, this.physical);

	this.update = function(){
		this.x = this.physical.position.x - this.width / 2;
		this.y = this.physical.position.y - this.height / 2;
	};

	this.getRenderData = function(){
		return({
			x : this.x,
			y : this.y,
			width : this.width,
			height : this.height
		});
	};

	this.destroy = function(){
		delete Entities[this.index];
	};


	Entities.push(this);
};

Entity.Update = function(){
	for(var i in Entities){
		var entity = Entities[i];

		entity.update();
	}
};

Entity.GetRenderData = function(){
	var renderData = [];
	for(var i in Entities){
		var entity = Entities[i];

		renderData.push(entity.getRenderData());
	}
	return renderData;
};


var Players = {};
var Player = function(id){
        this.id = id;
	
	this.x = 10;
        this.y = 10;
        this.width = 32;
        this.height = 32;

        this.entity = new Entity(this.x, this.y, this.width, this.height);

	
	this.destroy = function(){
		this.entity.destroy();
		delete Players[this.id];
	};


	Players[this.id] = this;
};


module.exports = {
	Player : Player,
	Entity : Entity
};
