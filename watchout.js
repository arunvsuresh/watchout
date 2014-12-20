// start slingin' some d3 here.


var options = {
  height: 500,
  width: 500,
  radius: 20,
  enemyNum: 5
};

var gameBoard = d3.select('body').append('svg:svg')
  .attr("width", options.width)
  .attr("height", options.height).attr('class', "mars");

var createEnemies = function(enemyNum) {
  var enemies = [];
  for (var i = 0; i < enemyNum; i++) {
    var obj = {};
    obj.id = i;
    obj.x = (Math.random() * (options.width-2*(options.radius)))+options.radius;
    obj.y = (Math.random() * (options.height-2*(options.radius)))+options.radius;
    enemies.push(obj);
  }
  return enemies;
};

var enemy = gameBoard.selectAll('svg')
                     .data(createEnemies(options.enemyNum))
                     .enter()
                     .append('svg:circle')
                     .attr('r', options.radius)
                     .attr('cx',function(d){return d.x;})
                     .attr('cy',function(d){return d.y;})
                     //.append('image')
                     //.attr('class', "asteroid");
