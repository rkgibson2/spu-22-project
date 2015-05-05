var width = 700,
    height = 500;

// tooltip
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<b> Test. Should never be seen</b>"
  });

var projection = d3.geo.orthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(90);

// rotate projection to start at Cambridge
projection.rotate([71.116944, 0])

var path = d3.geo.path()
    .projection(projection);

// base point radiuses off of datum "radius" element
path.pointRadius(function(f, i) { return f.radius})

// set up dragging for the map
var drag = d3.behavior.drag()
    .on("dragstart", dragstart)
    .on("drag", dragged);

var svg = d3.select("#map-holder").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(drag)
    .call(tip);

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
  d3.selectAll("path").attr("d", path);
}

// add points of interest
function addpoints(poi) {

  svg.selectAll(".poi")
      .data(poi)
    .enter().append("path")
      .attr("class", function(d) {
        return "poi " + d.name
      })
      .attr("d", path)
      .on("mouseover", function(d) {
        var html_string = d.tooltip + "<div class='more-info-text'> Click the location for more information on this subject. </div>";
        tip.html(html_string)
            .show(d);
      })
      .on("mouseout", tip.hide)
      // prevent event propagation to drag
      .on("mousedown", function(d) {
        d3.event.stopPropagation();
      })
      .on("click", showSideBar);
}

function showSideBar(place) {
  // set up new info
  d3.select("#info .place").html(place.placetitle);
  d3.select("#info .desc").html(place.longdesc);

  if ("image" in place && place.image != "") {
    d3.select("#info .image img").attr("src", place.image);
    d3.select("#info .image").classed("no-display", false);
  } else {
    d3.select("#info .image").classed("no-display", true);
  }

  if ("moreinfo" in place && place.moreinfo != "") {
    d3.select("#info .more-info a").attr("href", place.moreinfo);
    d3.select("#info .more-info").classed("no-display", false);
  } else {
    d3.select("#info .more-info").classed("no-display", true);
  }

  // check if we need to do transition
  if (d3.select("#info").classed("no-display")) {
    // duration of map slide
    var duration = 1500

    // move map over to left
    d3.select("#map")
        .transition().duration(duration)
        .style("left", "0px");
      
    // get info div to appear
    d3.select("#info")
        .classed("no-display", false)
        .style("opacity", 0)
      .transition().delay(duration / 2).duration(duration / 2)
        .style("opacity", 1);
        
  }
}