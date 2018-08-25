import { Component, Input } from '@angular/core';
import { Options, ChangeContext } from 'ng5-slider';
import { InputChannel } from '../common/input.channel';

interface SimpleSliderModel {
    value: number;
    options: Options;
}

@Component({
    selector: 'app-input-channel',
    templateUrl: './input-channel.component.html',
    styles: [`
        .drk { background-color: darkred; color: white; }
        .black { color: black; }
    `]
})
export class InputChannelComponent {
    @Input() input: InputChannel;
    strLabel = 'Gain';     // label for the gain input

    verticalSlider: SimpleSliderModel = {
        value: 0,
        options: {
            floor: -60,
            ceil: 10,
            vertical: true,
            showSelectionBar: true
        }
    };

    constructor() {}

    private onUserChangeEnd(changeContext: ChangeContext): void {
        this.input.set(this.input.levelCmd + ' ' + changeContext.value);
    }

    private phantom(): void {
        this.input.phantom = !this.input.phantom;
        this.input.set(this.input.phantomCmd + ' ' + Number(this.input.phantom));
    }

    private changeGain(event): void {
        this.input.set(this.input.gainCmd + ' ' + event);
    }

    private phase(): void {
        this.input.phase = !this.input.phase;
        this.input.set(this.input.phaseCmd + ' ' + Number(this.input.phase));
    }

    private mute(): void {
        this.input.mute = !this.input.mute;
        this.input.set(this.input.muteCmd + ' ' + Number(this.input.mute));
    }

    private changeDelay(event): void {
        if (event.delay) {
            this.input.set(this.input.delayCmd + ' ' + Number(event.delay));
            return;
        }
        if (event.state !== null) {
            this.input.set(this.input.delayStateCmd + ' ' + Number(event.state));
            return;
        }
    }

    /* git(): void {
        console.log(this.input);
    } */
}
