"use strict";

var net = require("net");

class Nexia{
    constructor(port, address) {
        this.port = port || 23;
        this.address = address || '127.0.0.1';
    }

    sendCMD(cmd, callback) {
        let nexia = this;
        let data = '';
        nexia.socket = net.connect(this.port, this.address)
        .on('connect', () => {
            nexia.socket.write(cmd + '\r\n', () => {
                nexia.socket.end();
            });
        })
        .on('data', buffer => {
            let str = buffer.toString();
            // Loop over each character received
            for (let i = 0, len = str.length; i < len; i++) {
                let chr = str[i];
                data += chr;
                //process.stdout.write(chr);
            }
        })
        .on('timeout', () => {
            console.log("A command has timed out!!!");
        })
        .on('error', error => {
            console.log("Error : " + error);
        })
        .on('end', () => {
            // match each line returned
            var found = data.match(/^(.*)$/gm);
            // filter out the empty items
            var filtered = found.filter( f => f.length !== 0 );
            // Remove the first item and the welcome item
            filtered.splice(0, 2);
            // Remove the 'Goodbye' last item
            filtered.pop();
            // Remove the space at the end
            filtered[1] = filtered[1].trim();
            //console.log(filtered);
            callback(filtered);
        });
    }
}
module.exports = Nexia;