var fs = require('fs');
fs.readFile('./gxt2.txt', 'utf8', function (err, data) {
  if (err) throw err;
  //Do your processing, MD5, send a satellite to the moon, etc.
  var output = 'Citizen.CreateThread(function() \n'
  data.toString().split("\n").forEach(function(line, index, arr) {
    //if (index === arr.length - 1 && line === "") { return; }
    line = line.trim();
    if (line != '' && line != '\n') {
      console.log('FILE -> ', line);
      var arr = line.split(' = ')
      output += '	AddTextEntry("' + arr[0] + '", "' + arr[1] + '") \n'
    }
  });
  output += 'end)'
  fs.writeFile ("./names.lua", output, function(err) {
    if (err) throw err;
    console.log('complete');
  });
});
