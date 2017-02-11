var noble = require('noble');
noble.on('discover', function(peripheral) {
  peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);
    peripheral.discoverServices(['180a'], function(error, services) {
      var deviceInformationService = services[0];
      console.log('discovered device information service');

      deviceInformationService.discoverCharacteristics(null, function(error, characteristics) {
        console.log('discovered the following characteristics:');
        for (var i in characteristics) {
          console.log('  ' + i + ' uuid: ' + characteristics[i].uuid);
        }
      });
    });
  });
});
