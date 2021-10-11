var sensorLib = require("node-dht-sensor");
var Gpio = require('onoff').Gpio; 
var LED = new Gpio(13, 'out'); 
var blinkInterval = setInterval(blinkLED, 251);
 
var app = {
  sensors: [
    {
      type: 11,
      pin: 4
    },
  ],
  read: function() {
    for (var sensor in this.sensors) {
      var readout = sensorLib.read(
        this.sensors[sensor].type,
        this.sensors[sensor].pin
      );
      console.log(`temperature: ${readout.temperature}°C`);
      if (readout.temperature <= 24) {
		blinkLED()
	} else {
		clearInterval(blinkInterval); 
	}
    }
    setTimeout(function() {
      app.read();
    }, 250);
  }
};

function blinkLED() { 
  if (LED.readSync() === 0) { 
    LED.writeSync(1);
  } else {
    LED.writeSync(0); 
  }
}

 
app.read();
