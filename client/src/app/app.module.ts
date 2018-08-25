import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppService } from './services/app.service';

import { Ng5SliderModule } from 'ng5-slider';
import { InputChannelComponent } from './input-channel/input-channel.component';
import { InputGainComponent } from './common/input-gain/input-gain.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { OutputChannelComponent } from './output-channel/output-channel.component';
import { DelayComponent } from './common/delay/delay.component';

@NgModule({
    declarations: [
        AppComponent,
        InputChannelComponent,
        InputGainComponent,
        OutputChannelComponent,
        DelayComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        Ng5SliderModule,
        AngularFontAwesomeModule
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }
