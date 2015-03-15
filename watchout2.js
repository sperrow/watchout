var settings = {
	w: window.innerWidth,
	h: window.innerHeight,
	r: 15,
	n: 30,
	duration: 2000
};

var mouse = { x: settings.w/2, y: settings.h/2 };
var score = 0, highScore = 0, collisionCount = 0;

var pixelize = function(number) {
	return number + 'px';
};

var rand = function(n) {
	return Math.floor( Math.random() * n);
};

var randX = function() { 
	return pixelize( rand(settings.w - settings.r * 2) );
};

var randY = function() {
	return pixelize( rand(settings.h - settings.r * 2) );
};

var updateScore = function() {
	d3.select('.scoreboard .current span').text(score);
	d3.select('.scoreboard .highscore span').text(highScore);
	d3.select('.scoreboard .collisions span').text(collisionCount);
};

/////////////////////////////////////////////

var board = d3.select('.board').style({
	width: pixelize( settings.w ),
	height: pixelize( settings.h )
});

d3.select('.mouse').style({
	top: pixelize( mouse.y ),
	left: pixelize( mouse.x ),
	width: pixelize( settings.r * 2 ),
	height: pixelize( settings.r * 2 ),
	'border-radius': pixelize( settings.r * 2 )
});

var asteroids = board.selectAll('.asteroid')
										 .data(d3.range(settings.n))
										 .enter().append('div')
										 .attr('class', 'asteroid')
										 .style({
										 	top: randY,
										 	left: randX,
										 	width: pixelize( settings.r * 2 ),
										 	height: pixelize( settings.r * 2 )
});

board.on('mousemove', function(){
	var loc = d3.mouse(this);
	mouse = {x:loc[0], y:loc[1]};
	d3.select('.mouse').style({
		top: pixelize(mouse.y),
		left: pixelize(mouse.x)
	});
});

var move = function(){
asteroids.transition().duration(settings.duration).style({
	top: randY,
	left: randX
	}).each('end', function(){
		move(d3.select(this));
	})
}

move(asteroids);


var scoreTicker = function(){
	score = score+1;
	highScore = Math.max(score, highScore);
	updateScore();
};

setInterval(scoreTicker, 100);

var detectCollisions = function(){
	var collision = false;

	asteroids.each(function(){
		var cx = this.offsetLeft + settings.r;
		var cy = this.offsetTop + settings.r;

		var x = cx-mouse.x;
		var y = cy-mouse.y;

		if (Math.sqrt(x*x + y*y) < settings.r*2){
			collision = true;
		}
	});

	if (collision){
		score = 0;
		board.style('background-color', 'purple');
		if(prevCollision != collision){
			collisionCount = collisionCount +1;
		}
	} else {
		board.style('background-color', 'white');
	}
	prevCollision = collision;
};
d3.timer(detectCollisions, 100);





