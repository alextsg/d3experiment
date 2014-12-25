/*d3.csv("https://www.kimonolabs.com/api/csv/6p063nz2?apikey=TIGMQy4hT6wns5yoxT1XgNlO6x1xlcWs&kimnoheaders=1",
  function(csv) {

csv.sort(function(a,b) {return b.game - a.game;});
*/
function kimonoCallback(data) {
var stats = data.results.collection1;
console.log(data);

var x=d3.scale.linear().domain([0,d3.max(stats, function(d) { return +d.game; })])
                       .range([margin,width-margin]);
var y=d3.scale.linear().domain([0,d3.max(stats, function(d) { return +d.points; })])
                       .range([height-margin,margin]);
var r=d3.scale.linear().domain([0,d3.max(stats, function(d) { return +d.gamescore; })])
                       .range([0,20]);
var o=d3.scale.linear().domain([10000,100000]).range([.5,1]);
var c=d3.scale.ordinal().domain(["W","L"]).range(["#26E810","#E84956"]);
var s=d3.scale.ordinal().domain(["points","fieldgoalper","freethrowper","threepointers","rebounds","assists","steals","blocks","turnovers","fouls","plusminus"])
                        .range(["Points","Field Goal %","Free Throw %","Threes Made","Rebounds","Assists","Steals","Blocks","Turnovers","Fouls","+/-"]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");


svg.append("g")
  .attr("class", "xaxis")
  .attr("transform", "translate(0," + (height - margin) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "yaxis")
  .attr("transform", "translate(" + margin + ",0)")
  .call(yAxis);

svg.append("text")
  .attr("class", "xlabel")
  .attr("text-anchor", "middle")
  .attr("x", width/2)
  .attr("y", height-10)
  .text("Games");

svg.append("text")
  .attr("class", "ylabel")
  .attr("text-anchor", "middle")
  .attr("x", -height/2)
  .attr("y", margin - 70)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Points");

var div = d3.select("svg").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

svg.selectAll("circle").data(stats).enter()
  .append("circle")
  .attr("cx",function(d) {return x(+d.game);})
  .attr("cy",function(d) {return y(0);})
  .attr("r",function(d) {return r(0);})
  .style("fill",function(d) {return c(d.outcome[0])})
  .append("title")
  .html(function(d) {return 'Opponent: ' + d.opponent + '<br/>Outcome: ' + d.outcome + '<br/>Gamescore: ' + d.gamescore;})
// now we initiate - moving the marks to their position

svg.selectAll("circle").transition().duration(1000)
  .attr("cx",function(d) {return x(+d.game);})
  .attr("cy",function(d) {return y(+d.points);})
  .attr("r",function(d) {return r(+d.gamescore);})
  

var update = function(updatestat) {

  y.domain([d3.min(stats, function(d) { return Math.min(0, +d[updatestat]); }), 
            d3.max(stats, function(d) { return Math.max(1, +d[updatestat]); })]);
  svg.select(".yaxis").call(yAxis);
  svg.select(".ylabel").text(function(d) {return s(updatestat);});
  var temp = s(updatestat);
  svg.selectAll("circle").transition().duration(1000)
     .attr("cx",function(d) {return x(+d.game);})
     .attr("cy",function(d) {return y(+d[updatestat]);})
     .attr("r",function(d) {return r(+d.gamescore);})
  }



$('select').on('change',function(){
  console.log(this.value);
  //console.log(this.html);
  update(this.value);
})

};

$.ajax({
    "url":"https://www.kimonolabs.com/api/6p063nz2?apikey=TIGMQy4hT6wns5yoxT1XgNlO6x1xlcWs&callback=kimonoCallback",
    "crossDomain":true,
    "dataType":"jsonp"
});

var width = 1200,
    height = 600, 
    margin = 70;

var svg=d3.select(".chart").append("svg").attr("width",width).attr("height",height);

