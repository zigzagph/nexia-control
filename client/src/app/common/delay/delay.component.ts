import { Component, Input, ViewChild, ElementRef,
         OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-delay',
    templateUrl: './delay.component.html',
    styles: [`
        .drk { background-color: darkred; color: white; }
        .black { color: black; }
        .grn { background-color: darkgreen; }
    `]
})
export class DelayComponent implements OnChanges {
    label = 'Delay';
    @Input() delay: number;
    @Input() state: boolean;
    @ViewChild('delayInput') dlyInput: ElementRef;
    @Output() dlyChange: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.dlyInput.nativeElement.placeholder = this.delay;
    }

    disable(): void {
        this.state = !this.state;
        this.dlyChange.emit({ 'state': this.state });
    }

    onEnter(event: any): void {
        this.delay = event;
        this.dlyInput.nativeElement.placeholder = this.delay;
        this.dlyChange.emit({ 'delay': this.delay });
    }

}
