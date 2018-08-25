"use strict";
var express = require('express');
var router = express.Router();

//------------------------------------ Routes ---------------------------------------------//

// root
router.get('/', function(req, res, next) {
    res.render('index.html');
});

// Handles discovery message stuff
router.get('/servers', function(req, res, next) {
    res.send(nexiaAddressArray);
});

//------------------------------------ Discovery ---------------------------------------------//

let nexiaAddressArray = [];

// Disovery Socket : used to listen to discovery messages sent
// from the nexia hardware.
const discoveryMsg = require('./nexia-discovery');
discoveryMsg.on('message', (address) => {
    nexiaAddressArray = address;
});

//------------------------------------ Telnet ---------------------------------------------//

var NexiaClient = require('./nexia-client');

// Get the Device ID of the nexia device
/* setTimeout(() => {
    console.log("Getting the device ID...");
    var nex = new NexiaClient(23, '192.168.0.130');
    nex.sendCMD('GET 0 DEVID', data => {
        console.log(data);
    });
}, 500); */

router.get('/send/', function(req, res, next) {
    //console.log(`Send API CMD: ${req.query.cmd} to server ${req.query.ip}.`);
    var nexia = new NexiaClient(23, req.query.ip);
    nexia.sendCMD(req.query.cmd, rtn => {
        console.log("Return : " + rtn);
        res.send(rtn);
    });
});

module.exports = router;