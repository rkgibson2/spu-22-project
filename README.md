# spu-22-project

### Robbie Gibson

Final Project for SPU 22

## Measuring the Earth: An interactive exploration

This project aims to show the different ways scientists measured the Earth's dimensions, mostly lengths, over history.
I started with Eratosthenes measuring the circumference of the Earth, and then moved through history.
Personally, I was astonished at how close people got to the true circumference even long ago.
I also discovered people attempting to measure the radius of the Earth (at first the one radius for a sphere, but later the different radii once we discovered the Earth wasn't spherical).
Some of the more recent events also cover how the definition of the meter came from measuring Earth distances.

Technically, I used Javascript, specifically the [d3](http://d3js.org/) library, developed by Mike Bostock, to do the visualiztions, mostly the rotating map.
The map data is stored in a format called [TopoJSON](https://github.com/mbostock/topojson), also developed by Mike Bostock.
The data for each point on the map is stored in a different JSON file that I created that is loaded in.
That's about it, although a (slightly) more indepth overview of the different files follows.

#### Overview of the files:

* `index.html`:
This contains the main html code for the website.
It should all be there, with the exception of the map svg, which is added dynamically with Javscript.

* `js/main.js`:
This contains all the Javascript code necessary to create the map.
First the projection is created and the necessary map data is loaded.
Next, I load all the points, adding each one to the map.
Finally, there is a little extra code to make the map slide over when the first point is clicked.

* `data/world-110m.json`:
This data file contains the TopoJSON data necessary to create the map.
It is taken from the examples section of the [TopoJSON repository](https://github.com/mbostock/topojson)

* `data/poi.json`:
This contains the data for each point that gets added to the map.
The points are represented as an array, where each element is an object with the following fields:

    * `coordinates`:
    An array of the point's geographical coordinates represented as `[longitude, latitude]` as is expected by the d3 projections.

    * `image`:
    A link to an image to appear in the sidebar that comes up when the point is selected.
    This field is optional.

    * `longdesc`:
    The string for the paragraph that appears in the sidebar that comes up when the point is selected.
    This string can contain HTML if, for example, you want to bold certain words or insert special characters.

    * `moreinfo`:
    A link to a page for more information.
    This link will appear as "For more info, click here" at the bottom of the sidebar, with "click here" being the link.
    This field is optional; if no link is provided, that whole line will not appear.

    * `name`:
    This name is used as the class for the dot on the map.
    Thus, it should have no spaces and, preferably, be all lowercase.

    * `radius`:
    This field is used for the radius of the circle on the map.
    I've used 6 for all of the circles, but they could be different.

    * `tooltip`:
    This appears when you hover over a given dot.
    Again, it uses HTML.
    I've bolded the specific place name when it appears in the tooltip.

    * `type`:
    This type tells d3 that it should be drawing a point.
    Right now, I only support having points.
    For more information on this, [see here](https://github.com/mbostock/d3/wiki/Geo-Paths).

* `data/image_sources.txt`:
For now, this is the location of the sources for the images in the sidebars.
I hope to convert this to a better display format soon, but for now, it's just a text file.

* `img/`:
This directory holds all the necessary images.

* `add_poi.py`:
This small script makes it easier to add a new point of interest.
Instead of having to manually edit the JSON, this will prompt you for the required fields (radius can't be changed from 6 and type can't be changed from "Point") and add it to the JSON itself.

* `proposal/`:
This directory contains the project proposal in `tex` and `pdf` formats, as well as the image in the document.