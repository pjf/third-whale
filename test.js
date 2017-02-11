console.log("Making noble object\n");
var noble = require('noble');

var we = require('./weevil');
var weVibe = new we.WeVibe();

weVibe.connect()
          .then(_ => {return weVibe.writeCommand(new Uint8Array([30, 32, 45, 0, 0, 0, 0, 0]));})
          //.then(_ => weVibe.disconnect())
          .catch(error => { console.log(error) });

/*
noble.on('discover', function(device) {
    console.log("Found device " + device.uuid);
    if (device.advertisement.localName == "Sync"){
    
        device.connect()
}
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
*/
