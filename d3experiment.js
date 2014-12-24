/*d3.csv("https://www.kimonolabs.com/api/csv/6p063nz2?apikey=TIGMQy4hT6wns5yoxT1XgNlO6x1xlcWs&kimnoheaders=1",
  function(csv) {

csv.sort(function(a,b) {return b.game - a.game;});
*/
var width = 1200,
    height = 600, 
    margin = 50;
/*
var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
var x=d3.scale.linear().domain([0,d3.max(data, function(d) { return d.game; })])
                       .range([margin,width-margin]);
var y=d3.scale.linear().domain([0,d3.max(data, function(d) { return d.points; })])
                       .range([height-margin,margin]);
var r=d3.scale.linear().domain([0,500])
                       .range([0,20]);
var o=d3.scale.linear().domain([10000,100000]).range([.5,1]);
var c=d3.scale.category10().domain(["Africa","America","Asia","Europe","Oceania"]);
*/
var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
var x=d3.scale.linear().domain([0,d3.max(stats, function(d) { return +d.game; })])
                       .range([margin,width-margin]);
var y=d3.scale.linear().domain([0,d3.max(stats, function(d) { return +d.points; })])
                       .range([height-margin,margin]);
var r=d3.scale.linear().domain([0,d3.max(stats, function(d) { return +d.gamescore; })])
                       .range([0,20]);
var o=d3.scale.linear().domain([10000,100000]).range([.5,1]);
var c=d3.scale.ordinal().domain(["W","L"]).range(["#26E810","#E84956"]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");


svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (height - margin) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + margin + ",0)")
  .call(yAxis);

/*


svg.selectAll(".h").data(d3.range(-8,10,2)).enter()
  .append("line").classed("h",1)
  .attr("x1",margin).attr("x2",height-margin)
  .attr("y1",y).attr("y2",y)
  
svg.selectAll(".v").data(d3.range(1,5)).enter()
  .append("line").classed("v",1)
  .attr("y1",margin).attr("y2",width-margin)
  .attr("x1",x).attr("x2",x)
*/

svg.selectAll("circle").data(stats).enter()
  .append("circle")
  .attr("cx",function(d) {return x(+d.game);})
  .attr("cy",function(d) {return y(0);})
  .attr("r",function(d) {return r(0);})

  .style("fill",function(d) {return c(d.outcome[0])})

    .append("title")
    .text(function(d) {return d.opponent + ' ' + d.outcome + ' ' + d.gamescore;})
 
// now we initiate - moving the marks to their position

svg.selectAll("circle").transition().duration(1000)
  .attr("cx",function(d) {return x(+d.game);})
  .attr("cy",function(d) {return y(+d.points);})
  .attr("r",function(d) {return r(+d.gamescore);})
