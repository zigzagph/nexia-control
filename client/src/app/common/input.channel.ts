import { AppService } from '../services/app.service';
import { Nexia } from '../common/nexia';

/* need to figure out a structure for this data
      Input Inst Id, Alloc to   Delay, Alloc to  Output Inst Id, Alloc To
Ch 1:        1         1          4      1              3           1
Ch 2:        1         1          5      1              3           1
Ch 3:        1         1          6      1              3           1
Ch 4:        1         1          7      1              3           1
Ch 5:        2         1                                3           1
Ch 6:        2         1                                3           1

*/

export class InputChannel {
    // Nexia Device
    nexia: Nexia;

    // Channel settings
    number: number;
    gain: number;
    phantom: boolean;
    mute: boolean;
    level: number;
    phase: boolean;
    delay: number;
    delayState: boolean;

    // Telnet Commands
    gainCmd: string;
    phantomCmd: string;
    muteCmd: string;
    levelCmd: string;
    phaseCmd: string;
    delayCmd: string;
    delayStateCmd: string;

    // Telnet Command Keys
    gainKey = 'INPGAIN';
    phantomKey = 'PHPWR';
    muteKey = 'INPMUTE';
    levelKey = 'INPLVL';
    phaseKey = 'INPINVRT';
    delayKey = 'DLYMSEC';
    delayStateKey = 'DLYBYP';

    constructor(nex: Nexia, channelNum: number, private appService: AppService) {
        this.nexia = nex;
        this.number = channelNum;

        // Set the instance ID for the output module
        this.nexia.instanceId = 1;

        this.gainCmd = this.nexia.device + ' ' + this.gainKey + ' ' + this.nexia.instanceId + ' ' + this.number;
        this.get(this.gainCmd);

        this.phantomCmd = this.nexia.device + ' ' + this.phantomKey + ' ' + this.nexia.instanceId + ' ' + this.number;
        this.get(this.phantomCmd);

        this.muteCmd = this.nexia.device + ' ' + this.muteKey + ' ' + this.nexia.instanceId + ' ' + this.number;
        this.get(this.muteCmd);

        this.levelCmd = this.nexia.device + ' ' + this.levelKey + ' ' + this.nexia.instanceId + ' ' + this.number;
        this.get(this.levelCmd);

        this.phaseCmd = this.nexia.device + ' ' + this.phaseKey + ' ' + this.nexia.instanceId + ' ' + this.number;
        this.get(this.phaseCmd);

        this.delayCmd = this.nexia.device + ' ' + this.delayKey + ' ' + this.getDelayInstance(this.number);
        this.get(this.delayCmd);

        this.delayStateCmd = this.nexia.device + ' ' + this.delayStateKey + ' ' + this.getDelayInstance(this.number);
        this.get(this.delayStateCmd);
    }

    getDelayInstance(num: number): number {
        if (num === 1) { return 4; }
        if (num === 2) { return 5; }
        if (num === 3) { return 6; }
        if (num === 4) { return 7; }
    }

    parseGetReturn(data): void {
        if ( data[0] === 'GET ' + this.gainCmd ) {
            this.gain = Math.round(data[1]);
        } else if ( data[0] === 'GET ' + this.phantomCmd ) {
            if (data[1] === '0') { this.phantom = false; }
            if (data[1] === '1') { this.phantom = true; }
        } else if ( data[0] === 'GET ' + this.muteCmd ) {
            if (data[1] === '0') { this.mute = false; }
            if (data[1] === '1') { this.mute = true; }
        } else if ( data[0] === 'GET ' + this.levelCmd ) {
            this.level = Math.round(data[1]);
        } else if ( data[0] === 'GET ' + this.phaseCmd ) {
            if (data[1] === '0') { this.phase = false; }
            if (data[1] === '1') { this.phase = true; }
        } else if ( data[0] === 'GET ' + this.delayCmd ) {
            this.delay = Math.round(data[1]);
        } else if ( data[0] === 'GET ' + this.delayStateCmd ) {
            if (data[1] === '0') { this.delayState = false; }
            if (data[1] === '1') { this.delayState = true; }
        }
    }

    get(cmd: string): any {
        this.appService.sendCmd(this.nexia.address, 'GET ' + cmd).subscribe(
            data => { this.parseGetReturn(data); },
            error => { console.log('Error : ' + error);
        });
    }

    set(cmd: string): any {
        this.appService.sendCmd(this.nexia.address, 'SET ' + cmd).subscribe(
            data => { console.log(data); },
            error => { console.log('Error : ' + error);
        });
    }

    /* inc(cmd: string): any {
        this.appService.sendCmd(this.nexia.address, 'INC ' + cmd).subscribe(
            data => { console.log(data); },
            error => { console.log('Error : ' + error); }
            // () => { console.log("Completed"); }
        );
    }

    dec(cmd: string): any {
        this.appService.sendCmd(this.nexia.address, 'DEC ' + cmd).subscribe(
            data => { console.log(data); },
            error => { console.log('Error : ' + error); }
            // () => { console.log("Completed"); }
        );
    } */
}
