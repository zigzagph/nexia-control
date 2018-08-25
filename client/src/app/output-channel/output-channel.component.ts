import { Component, Input } from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import { OutputChannel } from '../common/output.channel';

interface SimpleSliderModel {
    value: number;
    options: Options;
}

@Component({
    selector: 'app-output-channel',
    templateUrl: './output-channel.component.html',
    styles: [`
        .drk { background-color: darkred; color: white; }
        .black { color: black; }
    `]
})
export class OutputChannelComponent {
    @Input() output: OutputChannel;
    strLabel = 'Scale Lvl';     // label for the gain input

    verticalSlider: SimpleSliderModel = {
        value: 0,
        options: {
            floor: -60,
            ceil: 0,
            vertical: true,
            showSelectionBar: true
        }
    };

    constructor() {}

    private onUserChangeEnd(changeContext: ChangeContext): void {
        this.output.set(this.output.levelCmd + ' ' + changeContext.value);
    }

    private changeScale(event): void {
        this.output.set(this.output.scaleCmd + ' ' + event);
    }

    private phase(): void {
        this.output.phase = !this.output.phase;
        this.output.set(this.output.phaseCmd + ' ' + Number(this.output.phase));
    }

    private mute(): void {
        this.output.mute = !this.output.mute;
        this.output.set(this.output.muteCmd + ' ' + Number(this.output.mute));
    }

    git(): void {
        console.log(this.output);
    }
}
