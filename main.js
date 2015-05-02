var width = 960,
    height = 500;

var projection = d3.geo.orthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

var λ = d3.scale.linear()
    .domain([0, width])
    .range([-180, 180]);

var φ = d3.scale.linear()
    .domain([0, height])
    .range([90, -90]);

var drag = d3.behavior.drag()
    .on("drag", dragged);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.on("drag", function() {
  var p = d3.mouse(this);
  projection.rotate([λ(p[0]), φ(p[1])]);
  svg.selectAll("path").attr("d", path);
});

d3.json("world-110m.json", function(error, world) {
  d3.selectAll("svg").insert("path", ".foreground")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land");
  d3.selectAll("svg").insert("path", ".foreground")
      .datum(topojson.mesh(world, world.objects.countries))
      .attr("class", "mesh");    
  d3.selectAll("svg").selectAll("path").attr("d", path)
      .call(drag)
});

function dragged(d) {
  console.log("dragging")
  projection.rotate([λ(d3.event.x), 0]);
  svg.selectAll("path").attr("d", path);
  // d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}