// start slingin' some d3 here.
var options = {
  height: 500,
  width: 500,
  playerRadius: 20,
  asteroidRadius: 40,
  enemyNum: 10,
  playerNum: 1
};

var currentScore = 0;
var highestScore = 0;
var collisionCount = 0;
var prevCollision = false;

var enemies = [];
var player = [];
var gameBoard = d3.select('body').append('svg:svg')
  .attr("width", options.width)
  .attr("height", options.height).attr('class', "mars");

var generatePosition = function(obj) {
  obj.x = (Math.random() * (options.width - (options.asteroidRadius)));
  obj.y = (Math.random() * (options.height - (options.asteroidRadius)));
  return obj;
};

var findNewPositions = function() {
  for (var i = 0; i < enemies.length; i++) {
    generatePosition(enemies[i]);
  }
  return enemies;
};

var createEnemies = function(enemyNum) {
  for (var i = 0; i < enemyNum; i++) {
    var obj = {};
    obj.id = i;
    generatePosition(obj);
    enemies.push(obj);
  }
  return enemies;
};

enemies = createEnemies(options.enemyNum);

var setEnemies = gameBoard.selectAll('image')
                     .data(enemies)
                     .enter()
                     .append('image')
                     // .attr('r', options.asteroidRadius)
                     .attr('width',options.asteroidRadius)
                     .attr('height',options.asteroidRadius)
                     .attr('x',function(d){return d.x;})
                     .attr('y',function(d){return d.y;})
                     .attr('xlink:href', "asteroid.png")
                     .attr('class','asteroid');
                     // .style('color', 'red');

                     //.append('image')
                     //.attr('class', "asteroid");
var moveEnemies = function(element) {
                     element
                     .data(findNewPositions, function(d){
                      return d.id;})
                     .transition()
                     // .tween('image',function(){
                     //  return collisions(this);})
                     .duration(1000)
                     .attr('x',function(d){return d.x;})
                     .attr('y',function(d){return d.y;})
                     .each('end', function(){
                      moveEnemies(d3.select(this));
                     });
};

moveEnemies(gameBoard.selectAll('image'));

var createPlayer = function() {
  var obj = {};
  obj.x = options.height / 2;
  obj.y = options.width / 2;
  obj.setX = function(x) {
    if (x < options.playerRadius) {
      this.x = options.playerRadius;
    } else if (x > options.width - options.playerRadius) {
      this.x = options.width - options.playerRadius;
    } else {
      this.x = x;
    }
  };

  obj.setY = function(y) {
    if (y < options.playerRadius) {
      this.y = options.playerRadius;
    } else if (y > options.height - options.playerRadius) {
      this.y = options.height - options.playerRadius;
    } else {
      this.y = y;
    }

  };

  obj.moveRelative = function(relX, relY) {
    this.setX(relX + this.x);
    this.setY(relY + this.y);
  };
  player.push(obj);
  return player;
};

createPlayer();

var dragPlayer = d3.behavior.drag().on('drag', function(d){
  d.moveRelative(d3.event.dx, d3.event.dy);

  gameBoard.selectAll('circle').attr('cx',function(d){return d.x;}).attr('cy',function(d){return d.y;});
});

var setPlayer = gameBoard.selectAll('player').data(player).enter().append('svg:circle').attr('r',options.playerRadius).attr('fill','red').attr('cx',function(d){return d.x;}).attr('cy',function(d){return d.y;}).attr('class','player').call(dragPlayer);


var collisions = function() {
  var collision = false;
  gameBoard.selectAll('image').each(function(){
    var center = {
      x: parseFloat(d3.select(this).attr('x')) + (0.5 * (options.asteroidRadius)),
      y: parseFloat(d3.select(this).attr('y')) + (0.5 * (options.asteroidRadius))
    };

    var xDiff = center.x - player[0].x;
    var yDiff = center.y - player[0].y;

    var distance = Math.sqrt(Math.pow((xDiff), 2) + Math.pow((yDiff), 2));

    if (distance < ((options.asteroidRadius / 2) + (options.playerRadius))) {
      currentScore = 0;
      collision = true;

    }
  });

    if ( collision !== prevCollision && collision) {
      collisionCount++;
    }

    prevCollision = collision;


};

d3.timer(collisions);

var scoreBoard = function() {

  highestScore = Math.max(currentScore, highestScore);
  d3.select('.current').text("Current Score: " + currentScore);
  d3.select('.high').text("Highest Score: " + highestScore);
  d3.select('.collisions').text("Collisions: " + collisionCount);
  currentScore++;

};

setInterval(scoreBoard, 150);







