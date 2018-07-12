var fs = require('fs');

var regex = /(0x[A-Z-0-9]+)\s*=\s*(.*)/gim;

fs.readFile('./gxt2.txt', 'utf8', function(err, data) {
    if (err) throw err;

    var output = 'Citizen.CreateThread(function() \n';

    var matches = data.match(regex);

    if(matches == null)
    {
        console.error("Could not find any GXT entries...");
        return;
    }

    matches.forEach(function(match) {
        var newline = match.replace(regex, "AddTextEntry('$1', '$2')");
        console.log('Converting ', match, ' -> ', newline);
        output += '\t' + newline + "\n";
    });
    
    output += 'end)'

    fs.writeFile ("./names.lua", output, function(err) {
        if (err) throw err;

        console.log('Successfully converted ', matches.length, ' entries');

        console.log('Press any key to exit');

        process.stdin.on('data', process.exit.bind(process, 0));
    });
});
