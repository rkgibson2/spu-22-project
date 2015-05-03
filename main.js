var width = 960,
    height = 500;

var projection = d3.geo.orthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

// base point radiuses off of datum "radius" element
path.pointRadius(function(f, i) { return f.radius})

var λ = d3.scale.linear()
    .domain([0, width])
    .range([-180, 180]);

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
  // add sphere around map
  svg.append("path")
      .datum({type: "Sphere"})
      .attr("class", "outline")
      .attr("d", path)

  // add map features
  svg.append("path")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land");
  svg.append("path")
      .datum(topojson.mesh(world, world.objects.countries))
      .attr("class", "mesh");
  svg.selectAll("path").attr("d", path);


  svg.append("path")
      .datum(d3.geo.graticule())
      .attr("class", "graticule")
      .attr("d", path);

  // load data on points of interest
  d3.json("poi.json", function(error, poi) {
    addpoints(poi);
  });
});

// start dragging map
function dragstart(d) {
    // from http://bl.ocks.org/jczaplew/6457917
    var proj = projection.rotate();
    m0 = d3.event.sourceEvent.pageX;
    o0 = -proj[0];
}

// while dragging map
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

// add points of interest
function addpoints(poi) {

  // Eratosthenes, Alexandria
  svg.selectAll(".poi")
      .data(poi)
    .enter().append("path")
      .attr("class", function(d) {
        return "poi " + d.name
      })
      .attr("d", path);
}