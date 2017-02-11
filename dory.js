// Initial class generated by: <https://beaufortfrancois.github.io/sandbox/web-bluetooth/generator/>
// Other references:
//  * <https://googlechrome.github.io/samples/web-bluetooth/device-info.html>
//  * <https://googlechrome.github.io/samples/web-bluetooth/reset-energy.html>


class WeVibe {

  constructor() {
    this.device = null;
    this.onDisconnected = this.onDisconnected.bind(this);
    console.log(":D");
  }

  request() {
    let options = {
                  "filters": [{
        "services": ["0000bb03-0000-1000-8000-00805f9b34fb"]
      }],
      "optionalServices": ["f000bb03-0451-4000-b000-000000000000"]
    };
    return navigator.bluetooth.requestDevice(options)
    .then(device => {
      this.device = device;
      this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
      return device;
    });
  }

  connect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    } else {
      return this.device.gatt.connect();

    }
  }

  readInfo() {
    return this.device.gatt.getPrimaryService("f000bb03-0451-4000-b000-000000000000")
    .then(service => service.getCharacteristic("f000b000-0451-4000-b000-000000000000"))
    .then(characteristic => characteristic.readValue());
  }

  writeCommand(data) {
    return this.device.gatt.getPrimaryService("f000bb03-0451-4000-b000-000000000000")
    .then(service => service.getCharacteristic("f000c000-0451-4000-b000-000000000000"))
    .then(characteristic => characteristic.writeValue(data));
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    } else {
      return this.device.gatt.disconnect();
    }
  }

  onDisconnected() {
    console.log('Device is disconnected.');
  }
}

var noble = require('noble');
var navigator = require('navigator');

var weVibe = new WeVibe();

noble.on('discover', function(device) {
    console.log("Found device " + device.uuid);
    console.log(device.advertisement.localName);
    if (device.advertisement.localName == "Sync"){
    
        data = new Uint8Array([30, 32, 45, 0, 0, 0, 0, 0])
        device.gatt.connect()
       device.gatt.getPrimaryService("f000bb03-0451-4000-b000-000000000000")
        .then(service => service.getCharacteristic("f000c000-0451-4000-b000-000000000000"))
        .then(characteristic => characteristic.writeValue(data));
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
