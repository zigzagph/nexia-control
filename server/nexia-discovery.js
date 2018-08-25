
//---------------------------------------------------------------------------------//
// The following section is used for generating events to any listening modueles. The 
// event is sent when a discovery message is found. 

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const discoveryMsgEmitter = new MyEmitter();

//---------------------------------------------------------------------------------//
// The following section listens for a broadcast message that are sent from the 
// Nexia hardware via multicast UDP packets. Once a message is returned it is
// added to the nexiaAddress array.

// Nexia device array
let addressesArray = [];

const udp = require('dgram');
const socket = udp.createSocket('udp4');

socket.on('listening', () => {
	const address = socket.address();
	console.log(`Listening for Nexia broadcast messages via ${address.address}:${address.port}`);
});

socket.on('message', (msg, rinfo) => {
	if(!addressesArray.includes(rinfo.address)){
		addressesArray.push(rinfo.address);
	}
	//console.log(new Date().toLocaleTimeString() + ` Broadcast message ${msg} received from ${rinfo.address}:${rinfo.port}`);
	discoveryMsgEmitter.emit('message', addressesArray);
});

socket.on('error', (err) => {
	console.log(`server error:\n${err.stack}`);
	socket.close();
});

socket.bind({port: 12003}, () => {
	socket.addMembership('224.0.0.251');
});

module.exports = socket;
module.exports = discoveryMsgEmitter;