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

	enemies.enter()
				 .append('image')
				 .attr('width', '50px')
				 .attr('height', '50px')
				 .attr("xlink:href", "asteroid.png")
				 .attr('x', function(d) {return axes.x(d.x);})
				 .attr('y', function(d) {return axes.y(d.y);});
};

render(createEnemies());