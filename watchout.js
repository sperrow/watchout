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

var gameBoard = d3.select('.container')
									.append('svg')
									.attr('class', 'board')
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

	return enemies;
}



var render = function(enemyData){

	var enemies = gameBoard.selectAll('image')
												 .data(enemyData, function (d) {return d.id});


	enemies.enter()
				 .append('image')
				 .attr('width', '20px')
				 .attr('height', '20px')
				 // .attr('class', 'enemy')
				 .attr("xlink:href", "http://www.serebii.net/blackwhite/accessories/shuriken.png")
				 .attr('x', function(d) {return axes.x(d.x);})
				 .attr('y', function(d) {return axes.y(d.y);})
				 // .transition().duration(1500)
				 // 						  .attr('x', function(d) {return axes.x(Math.random() * 100);})
					// 					  .attr('y', function(d) {return axes.y(Math.random() * 100);});
				 // .attr('transform', 'rotate(180 ' + function(d) {return axes.x(d.x);} + ',' + function(d) {return axes.y(d.y);} + ')');				 



	// gameBoard.selectAll('image').each(function(){
	// 	var enemy = d3.select(this);
	// 	var a = player.attr("cx") - enemy.attr('x');
	// 	var b = player.attr("cy") - enemy.attr('y');
	// 	var c = Math.sqrt(a*a + b*b);
	// 	if (c < 20){
	// 		collision = true;
	// 	}
	// });

};

// var enemySpin = function() {
// 	gameBoard.selectAll('image').each(function(){
// 		// debugger;
// 		var enemy = d3.select(this);
// 		var x = enemy.attr('x');
// 		var y = enemy.attr('y');
// 		// console.log('x: ' + x + ', y: ' + y);
// 		enemy.attr('transform', 'rotate(180, ' + x + ',' + y + ')');
// 		// console.log('enemy.attr("transform"): ' + enemy.attr('transform'));
// 	});
// };

// var Player = function(){
// 	this.path= 'm294.10526,176l0,36l26.5,-18l-51.60526,-5.99998l53,-8.00002l-46.02634,21.99998l18.13159,-25.99998z';
// 	this.fill= '#ff99CF';
//   this.x= 0;
//   this.y= 0;
//   this.angle= 0;
//   this.r= 5;

// };

// Player.prototype.render = function(){
//   this.x = gameOptions.width * 0.5;
//   this.y = gameOptions.height * 0.5;
//   gameBoard.selectAll('.player')
//   				 .data([{x:this.x, y: this.y, r:this.r}])
//   				 .enter()
//   				 .append('svg:path')
//   				 .attr('class', 'player')
//   				 .attr('d', this.path)
//   				 .attr('fill', this.fill)
//   				 .attr('x', this.x)
//   				 .attr('y', this.y)
//   				 .call(drag);

// };


// Player.prototype.setX = function(x){
// 	var minX = gameOptions.padding;
// 	var maxX = gameOptions.width - gameOptions.padding;
// 	if (x <= minX) {
// 		x = minX;
// 	}
// 	if (x >= maxX) {
// 		x = maxX;
// 	}
// 	this.x = x;
// }

// Player.prototype.setY = function(y){
// 	var minY = gameOptions.padding;
// 	var maxY = gameOptions.height - gameOptions.padding;
// 	if (y <= minY) {
// 		y = minY;
// 	}
// 	if (y >= maxY) {
// 		y = maxY;
// 	}
// 	this.y = y;
// }

// Player.prototype.transform = function(x, y){
// 	this.setX(this.x + x);
// 	this.setY(this.y + y);
// 	var translate = 'translate(' + this.x + ', ' + this.y + ')';
// 	gameBoard.select('path')
// 					 .attr('transform', translate);
// };

// Player.prototype.moveRelative = function(x, y){
// 	this.transform(x, y);
// };

// Player.prototype.setupDragging = function(){
// 	var dragMove = function() {
// 		this.moveRelative(d3.event.x, d3.event.y);
// 	};

// 	var drag = d3.behavior.drag()
// 							 .on('drag', dragMove)

// 	gameBoard.select('path').call(drag);		
// };

 var enemyData = createEnemies();
 render(enemyData);

setInterval(function() {
	render(enemyData);
}, 2000);

// var player = new Player();
// player.render();

var drag = d3.behavior.drag()
						 .on('dragstart', function() { player.style('fill', '#ffcf99'); })
					   .on('drag', function() {player.attr('cx', d3.event.x)
					   															 .attr('cy', d3.event.y); })
					   .on('dragend', function() { player.style('fill', '#4477dd'); });

var player = gameBoard.selectAll('.player')
  				 					  .data([{x:(gameOptions.width * 0.5), y: (gameOptions.height * 0.5), r: 10 }])
					  				  .enter()
					  				  .append('svg:circle')
					  			 	  .attr('class', 'player')
					  				  .attr('cx', function(d) { return d.x; })
					  				  .attr('cy', function(d) { return d.y; })
					  				  .attr('r', function(d) { return d.r; })
					  				  .call(drag)
					  				  .style('fill', "#4477dd");


var scoreTicker = function(){
	gameStats.score++;
	gameStats.bestScore	= Math.max(gameStats.score, gameStats.bestScore);
	d3.select(".high span").text(gameStats.bestScore);
	d3.select(".current span").text(gameStats.score);
};
setInterval(scoreTicker, 250);

var prevCollision = false;
var collisionCount = 0;

var detectCollision = function(){
	var collision = false;

	gameBoard.selectAll('image').each(function(){
		var enemy = d3.select(this);
		var a = player.attr("cx") - enemy.attr('x');
		var b = player.attr("cy") - enemy.attr('y');
		var c = Math.sqrt(a*a + b*b);
		if (c < 20){
			collision = true;
		}
	});

	if(collision){
		if(prevCollision !== collision){
			gameStats.score = 0;
		}
	}
	prevCollision = collision;
}

// d3.timer(enemySpin);
d3.timer(detectCollision);


