var noble = require("noble");
console.log("hi")


noble.on('stateChange', function(state) {
    if (state == 'poweredOn') {
        console.log("Scanning!");
        noble.startScanning();
    }
    else {
        console.log("New state is "+state);
    }
});




noble.on('discover', function(device) {
  console.log("discover")
  if (device.advertisement.localName == "Sync"){
  console.log("sync")
  device.connect(function(error) {
    console.log('connected to device: ' + device.uuid);
    a = device.discoverServices()
    console.log(a)

    device.discoverServices(null, function(error, services) {
 for (var i in services) {
        console.log('  ' + i + ' uuid: ' + services[i].uuid);
      }
      console.log("services")
      console.log(services)
      console.log("alsdkjf 0")
      console.log(services[0]._noble._characteristics)
      console.log("alsdkjf 1")
      console.log(services[1]._noble._characteristics)
      var wevibe = services[0];
      console.log('discovered thign');
      
      console.log("AAAAAA")
    
      s = services[0]


      s.discoverCharacteristics(['180a'], function(error, characteristics) {
        var c = characteristics[0];
        console.log('discovered Alert Level characteristic');

        // true if for write without response
        c.write(new Uint8Array([30, 32, 45, 0, 0, 0, 0, 0]), true, function(error) {
          console.log('buzz?');
        });
      });
    });
  });
  }
});
