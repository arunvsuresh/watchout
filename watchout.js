// start slingin' some d3 here.
var options = {
  height: 500,
  width: 500,
  radius: 40,
  enemyNum: 5,
  playerNum: 1
};

var enemies = [];
var player = [];
var gameBoard = d3.select('body').append('svg:svg')
  .attr("width", options.width)
  .attr("height", options.height).attr('class', "mars");

var generatePosition = function(obj) {
  obj.x = (Math.random() * (options.width-2*(options.radius)))+options.radius;
  obj.y = (Math.random() * (options.height-2*(options.radius)))+options.radius;
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
                     // .attr('r', options.radius)
                     .attr('width',options.radius)
                     .attr('height',options.radius)
                     .attr('x',function(d){return d.x;})
                     .attr('y',function(d){return d.y;})
                     .attr('xlink:href', "asteroid.png");
                     // .style('color', 'red');

                     //.append('image')
                     //.attr('class', "asteroid");
var moveEnemies = function() {
          gameBoard.selectAll('image')
                     .data(findNewPositions, function(d){
                      return d.id;})
                     .transition()
                     .duration(1000)
                     .attr('x',function(d){return d.x;})
                     .attr('y',function(d){return d.y;});
};

setInterval(moveEnemies,1000);

var createPlayer = function() {
  var obj = {};
  obj.x = options.height / 2;
  obj.y = options.width / 2;
  obj.setX = function(x) {
    if (x < options.radius) {
      this.x = options.radius;
    } else if (x > options.width - options.radius) {
      this.x = options.width - options.radius;
    } else {
      this.x = x;
    }
  };

  obj.setY = function(y) {
    if (y < options.radius) {
      this.y = options.radius;
    } else if (y > options.height - options.radius) {
      this.y = options.height - options.radius;
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
});

var setPlayer = gameBoard.selectAll('player').data(player).enter().append('svg:circle').attr('r',options.radius).attr('fill','red').attr('cx',function(d){return d.x;}).attr('cy',function(d){return d.y;}).attr('class','player').call(dragPlayer);

var movePlayer = function(){
  gameBoard.selectAll('circle').attr('cx',function(d){return d.x;}).attr('cy',function(d){return d.y;});
};
setInterval(movePlayer,50);
// player[0].call(dragPlayer);







