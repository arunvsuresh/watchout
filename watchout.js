// start slingin' some d3 here.
var options = {
  height: 500,
  width: 500,
  radius: 20,
  enemyNum: 5
};

var enemies = [];

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

var setEnemies = gameBoard.selectAll('svg')
                     .data(enemies)
                     .enter()
                     .append('svg:circle')
                     .attr('r', options.radius)
                     .attr('cx',function(d){return d.x;})
                     .attr('cy',function(d){return d.y;});

                     //.append('image')
                     //.attr('class', "asteroid");
var moveEnemies = function() {
          gameBoard.selectAll('circle')
                     .data(findNewPositions, function(d){
                      return d.id;})
                     .transition()
                     .duration(1000)
                     .attr('cx',function(d){return d.x;})
                     .attr('cy',function(d){return d.y;});
};

setInterval(moveEnemies,1000);



