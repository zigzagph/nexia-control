import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-input-gain',
    templateUrl: './input-gain.component.html',
    styles: [`
    .gain {
        width: 40px;
        height: 30px;
    }
    `]
})
export class InputGainComponent {
    @Input() value: number;
    @Input() label: string;
    @Output() lvlChange: EventEmitter<any> = new EventEmitter();

    constructor() {}

    increment(): void {
        // Set the ceiling on the output of 24db
        if (this.label === 'Scale Lvl') {
            if (this.value >= 24) {
                return;
            }
            this.value += 6;
            this.lvlChange.emit(this.value);
        }

        // Set the ceiling on the gain of 66db
        if (this.label === 'Gain') {
            if (this.value >= 66) {
                return;
            }
            this.value += 6;
            this.lvlChange.emit(this.value);
        }
    }

    decrement(): void {
        // prevents less then zero values
        if (this.value <= 0) {
            return;
        }
        this.value -= 6;
        this.lvlChange.emit(this.value);
    }

}
