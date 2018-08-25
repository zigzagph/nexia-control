import { AppService } from '../services/app.service';
import { Nexia } from '../common/nexia';

export class OutputChannel {
    // Nexia Device
    nexia: Nexia;

    // Channel settings
    number: number;
    mute: boolean;
    level: number;
    phase: boolean;
    scale: number;

    // Telnet Commands
    muteCmd: string;
    levelCmd: string;
    phaseCmd: string;
    scaleCmd: string;

    // Telnet Command Keys
    muteKey = 'OUTMUTEPM';
    levelKey = 'OUTLVLPM';
    phaseKey = 'OUTINVRTPM';
    scaleKey = 'OUTFSPM';

    constructor(nex: Nexia, channelNum: number, private appService: AppService) {
        this.nexia = nex;
        this.number = channelNum;

        // Set the instance ID for the output module
        this.nexia.instanceId = 3;

        this.scaleCmd = this.nexia.device + ' ' + this.scaleKey + ' ' + this.nexia.instanceId + ' ' + this.number;
        this.get(this.scaleCmd);

        this.muteCmd = this.nexia.device + ' ' + this.muteKey + ' ' + this.nexia.instanceId + ' ' + this.number;
        this.get(this.muteCmd);

        this.levelCmd = this.nexia.device + ' ' + this.levelKey + ' ' + this.nexia.instanceId + ' ' + this.number;
        this.get(this.levelCmd);

        this.phaseCmd = this.nexia.device + ' ' + this.phaseKey + ' ' + this.nexia.instanceId + ' ' + this.number;
        this.get(this.phaseCmd);
    }

    parseGetReturn(data): void {
        if ( data[0] === 'GET ' + this.scaleCmd ) {
            this.scale = Math.round(data[1]);
        } else if ( data[0] === 'GET ' + this.muteCmd ) {
            if (data[1] === '0') { this.mute = false; }
            if (data[1] === '1') { this.mute = true; }
        } else if ( data[0] === 'GET ' + this.levelCmd ) {
            this.level = Math.round(data[1]);
        } else if ( data[0] === 'GET ' + this.phaseCmd ) {
            if (data[1] === '0') { this.phase = false; }
            if (data[1] === '1') { this.phase = true; }
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
            error => { console.log('Error : ' + error);
        });
    }

    dec(cmd: string): any {
        this.appService.sendCmd(this.nexia.address, 'DEC ' + cmd).subscribe(
            data => { console.log(data); },
            error => { console.log('Error : ' + error);
        });
    } */
}
