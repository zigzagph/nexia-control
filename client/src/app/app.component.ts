import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';
import { Nexia } from './common/nexia';
import { InputChannel } from './common/input.channel';
import { OutputChannel } from './common/output.channel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'OTOjOY Nexus Control';
    nexiaConnection = new Nexia;
    nexiaServers: Array<string>;
    inputChannels: Array<InputChannel> = [];
    outputChannels: Array<OutputChannel> = [];

    constructor(private appService: AppService) {}

    ngOnInit() {
        setInterval(() => {
            this.appService.getServers().subscribe(
                    data => this.getServers(data),
                    error => { console.log(error); }
                );
        }, 2000);
    }

    private getServers(data: Array<string>): void {
        this.nexiaServers = data;

        if (this.nexiaServers.length === 0 && this.nexiaConnection) {
            this.inputChannels = [];
            this.outputChannels = [];
        }
    }

    private selectServer(server: string): any {
        if (this.nexiaConnection.address !== server) {
            this.nexiaConnection.address = server;
        }
    }

    private addInput(): void {
        if (this.inputChannels.length < 4) {
            const channel = new InputChannel(this.nexiaConnection, this.inputChannels.length + 1, this.appService);
            this.inputChannels.push(channel);
        }
    }

    private addOutput(): void {
        if (this.outputChannels.length < 6) {
            const channel = new OutputChannel(this.nexiaConnection, this.outputChannels.length + 1, this.appService);
            this.outputChannels.push(channel);
        }
    }
}
