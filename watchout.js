// start slingin' some d3 here.


var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 25,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
};

var gameBoard = d3.select('.container').append('svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);

var createEnemies = function(){
	var enemies = [];
	for (var i = 0; i < gameOptions.nEnemies; i++){
		var enemy = {};
		enemy["id"] = i;
		enemy["x"] = Math.random() * 100;
		enemy["y"] = Math.random() * 100;
		enemies.push(enemy);
	}
	console.log(enemies);
	return enemies;
}

var render = function(enemyData){

	var enemies = gameBoard.selectAll('image')
												 .data(enemyData, function (d) {return d.id});

	enemies.transition()
				 .duration(1500)
				 .attr('x', function(d) {return axes.x(Math.random() * 100);})
				 .attr('y', function(d) {return axes.y(Math.random() * 100);});

	enemies.enter()
				 .append('image')
				 .attr('width', '20px')
				 .attr('height', '20px')
				 .attr("xlink:href", "asteroid.png")
				 .attr('x', function(d) {return axes.x(d.x);})
				 .attr('y', function(d) {return axes.y(d.y);});

};


var Player = function(){
	this.path= 'm294.10526,176l0,36l26.5,-18l-51.60526,-5.99998l53,-8.00002l-46.02634,21.99998l18.13159,-25.99998z';
	this.fill= '#ff99CF';
  this.x= 0;
  this.y= 0;
  this.angle= 0;
  this.r= 5;

};

Player.prototype.render = function(){
  this.x = gameOptions.width * 0.5;
  this.y = gameOptions.height * 0.5;
  gameBoard.append('svg:path')
  				 .attr('d', this.path)
  				 .attr('fill', this.fill)
  				 .attr('x', this.x)
  				 .attr('y', this.y);

  this.setupDragging();
};


Player.prototype.setX = function(x){
	var minX = gameOptions.padding;
	var maxX = gameOptions.width - gameOptions.padding;
	if (x <= minX) {
		x = minX;
	}
	if (x >= maxX) {
		x = maxX;
	}
	this.x = x;
}

Player.prototype.setY = function(y){
	var minY = gameOptions.padding;
	var maxY = gameOptions.width - gameOptions.padding;
	if (y <= minY) {
		y = minY;
	}
	if (y >= maxY) {
		y = maxY;
	}
	this.y = y;
}

Player.prototype.moveRelative = function(x, y){
	this.x += x;
	this.y += y;
};

Player.prototype.setupDragging = function(){
	var dragMove = function() {
		this.moveRelative(d3.event.dx, d3.event.dy);
	};

	var drag = d3.behavior.drag()
							 .on('drag', dragMove)

		
};

var enemyData = createEnemies();
render(enemyData);

setInterval(function() {
	render(enemyData);
}, 2000);

var player = new Player();
player.render();
