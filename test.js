console.log("Making noble object\n");
var noble = require('noble');

noble.on('discover', function(device) {
    console.log("Found device " + device.uuid);
});

noble.on('stateChange', function(state) {
    if (state == 'poweredOn') {
        console.log("Scanning!");
        noble.startScanning();
    }
    else {
        console.log("New state is "+state);
    }
});
