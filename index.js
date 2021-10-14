var sensorLib = require("node-dht-sensor");
var Gpio = require('onoff').Gpio; 
var LED = new Gpio(13, 'out'); 
var blinkInterval;
 
var app = {
	sensors: [
		{
			type: 11,
			pin: 4
		},
	],
	read: function() {
		for (var sensor in this.sensors) {
			blinkLED()
			clearInterval(blinkInterval)
		
			var readout = sensorLib.read(
				this.sensors[sensor].type,
				this.sensors[sensor].pin
			);
			
			console.log(`temperature: ${readout.temperature}°C`);
			
			if (readout.temperature < 24) {
				blinkInterval = setInterval(blinkLED, 900);
			} else if (readout.temperature == 24) {
				blinkInterval = setInterval(blinkLED, 500);
			} else if (readout.temperature == 25) {
				blinkInterval = setInterval(blinkLED, 350);
			} else if (readout.temperature == 26) {
				blinkInterval = setInterval(blinkLED, 250);
			} else if (readout.temperature == 27) {
				blinkInterval = setInterval(blinkLED, 150);
			} else if (readout.temperature <= 28) {
				blinkInterval = setInterval(blinkLED, 50);
			} else {
				console.log('error')
			}
    	}
    	
    	setTimeout(function() {
      		app.read();
    	}, 1000);
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
