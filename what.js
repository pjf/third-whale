var noble = require("noble");
noble.on('discover', function(peripheral) {
  peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);
    peripheral.discoverServices(['f000bb03-0451-4000-b000-000000000000'], function(error, services) {
      var immediateAlertService = services[0];
      console.log('discovered Immediate Alert service');

      immediateAlertService.discoverCharacteristics(['f000c000-0451-4000-b000-000000000000'], function(error, characteristics) {
        var alertLevelCharacteristic = characteristics[0];
        console.log('discovered Alert Level characteristic');

        // true if for write without response
        alertLevelCharacteristic.write(new Uint8Array([30, 32, 45, 0, 0, 0, 0, 0]), true, function(error) {
          console.log('set alert level to mid (1)');
        });
      });
    });
  });
});
