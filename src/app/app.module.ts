import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { StoreModule } from '@ngrx/store';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { AnalogClockComponent } from './analog-clock/analog-clock.component';
import { synchronizeReducer } from './reducers/synchronize.reducer';




@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    StoreModule.forRoot({
       synchronize: synchronizeReducer
    }),
    ReactiveFormsModule
    ],
  declarations: [ AppComponent, HelloComponent, DigitalClockComponent, AnalogClockComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
