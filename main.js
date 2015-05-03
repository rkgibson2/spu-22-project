var width = 960,
    height = 500;

var projection = d3.geo.orthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

var λ = d3.scale.linear()
    .domain([-width, 0, width])
    .range([180, -180, 180]);

var φ = d3.scale.linear()
    .domain([0, height])
    .range([90, -90]);

var drag = d3.behavior.drag()
    .on("dragstart", dragstart)
    .on("drag", dragged);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(drag);

d3.json("world-110m.json", function(error, world) {
  d3.selectAll("svg").insert("path", ".foreground")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land");
  d3.selectAll("svg").insert("path", ".foreground")
      .datum(topojson.mesh(world, world.objects.countries))
      .attr("class", "mesh");

  d3.selectAll("svg").selectAll("path").attr("d", path)

   d3.selectAll("svg").attr("map-x", 0);
});

function dragstart(d) {
    // from http://bl.ocks.org/jczaplew/6457917
    var proj = projection.rotate();
    m0 = d3.event.sourceEvent.pageX;
    o0 = -proj[0];
}

function dragged(d) {
  if (m0) {
      var m1 = d3.event.sourceEvent.pageX;
          o1 = o0 + (m0 - m1) / 4;
      projection.rotate([-o1, 0]);
  }

  // Update the map
  path = d3.geo.path().projection(projection);
  d3.selectAll("path").attr("d", path);
}