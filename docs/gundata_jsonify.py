# just for removing a dummy file
import os

# Code logic is scuffed but it works.

targetJson = "./js/gundata.json"
testOut = "./dummy.txt"
dataSrc = "./gundata.txt"

out = open(targetJson, "w")
data = open(dataSrc, "r")

lines = []
shouldAppend = False

# Read the lines and jsonify them
for line in data:
    
    if line.startswith("["):
        lines.append('{"name":'+'"'+line.strip()[1:-1]+'"'+",\n")
        shouldAppend = True

    elif line.startswith("#end"):
        lines.append("},\n")
        shouldAppend = False

    elif shouldAppend and not line.isspace() and not line.startswith("--"):
        dpair = line.strip().split(":")
        tmpStr = ""
        tmpStr += '"'+dpair[0]+'":'
        tmpStr += '"'+dpair[-1]+'",\n'
        lines.append(tmpStr)

# Write the lines into the json file
for l in lines:
    out.write(l)

out.close()
data.close()

# Clean up, remove trailing commas on the last items

file_r = open(targetJson, "r")
file_w = open(testOut, "w+")

lines = []

for line in file_r:
    
    # trim last comma of each json entry
    if line.startswith("}"):
        lines[-1] = lines[-1].strip()[:-1]+"\n"
        lines.append(line)
    
    elif not line.isspace():
        lines.append(line)

# add a bracket to the first entry
lines[0] = "["+lines[0][0:]

# remove the trailing comma of the last } and close the bracket
lines[-1] = lines[-1].strip()[0]+"]\n"

# Write to dummy
for line in lines:
    file_w.write(line)

file_r.close()
file_w.close()

# move lines of dummy to json again
file_r = open(testOut, "r")
file_w = open(targetJson, "w")

for line in file_r:
    file_w.write(line)

file_r.close()
file_w.close()

# cleanup final
if os.path.exists(testOut):
    os.remove(testOut)
