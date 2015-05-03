import json

with open("poi.json") as infile:
	poi = json.load(infile)

print "Name of place:"
name = "".join(raw_input().split()).lower()

print "Latitude:"
latitude = float(raw_input().strip())

print "Longitude:"
longitude = float(raw_input().strip())

print "Tooltip:"
tooltip = raw_input()


new_point = {"type": "Point", "name": name, "coordinates": [longitude, latitude], "radius": 5, "tooltip": tooltip}
poi.append(new_point)

with open("poi.json", "w") as outfile:
	json.dump(poi, outfile, indent=4)