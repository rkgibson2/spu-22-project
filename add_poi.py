#! /usr/bin/env python
import json

with open("data/poi.json") as infile:
	poi = json.load(infile)

print "Short name of place:"
name = "".join(raw_input().split()).lower()

print "Latitude:"
latitude = float(raw_input().strip())

print "Longitude:"
longitude = float(raw_input().strip())

print "Tooltip:"
tooltip = raw_input()

print "Long title for place:"
placetitle = raw_input()

print "Longer description of place and event:"
longdesc = raw_input()

print "Image link?"
image = raw_input()

print "Link for more info?"
moreinfo = raw_input()

new_point = {"type": "Point", 
 			 "name": name, 
 			 "coordinates": [longitude, latitude], 
 			 "radius": 6, 
 			 "tooltip": tooltip, 
 			 "placetitle": placetitle, 
 			 "image": image, 
 			 "moreinfo": moreinfo, 
 			 "longdesc": longdesc}
poi.append(new_point)

with open("data/poi.json", "w") as outfile:
	json.dump(poi, outfile, indent=4, sort_keys=True)