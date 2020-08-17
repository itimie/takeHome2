import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState, millisecondSelector} from './../app.state';
import {BaseClock} from './../base-clock';
import { Subscription } from 'rxjs';
import {tap} from 'rxjs/operators';
import * as SynchronizeActions from './../actions/synchronize.actions';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.css']
})
export class AnalogClockComponent extends BaseClock implements OnInit, OnDestroy{

  constructor(public fb: FormBuilder, public store: Store<AppState>) { 
    super(fb, store);
  }


  ngOnInit(){
    super.ngOnInit();
  }

  ngOnDestroy(){
    super.ngOnDestroy();
  }

  dispatchAction(): void{
    this.store.dispatch(new SynchronizeActions.SynchronizeAnalogAction({millisecond: this.date.getTime()}));
  }

  updateClock(){
   this.formatHour();
   this.formatMinute();
   this.formatSeconds();
  }

  formatHour(){
    var hours = ((this.date.getHours() + 11) % 12 + 1);
    const hour = ((hours + this.date.getMinutes()/60) * (360/12)) % 360;
    (document.querySelector('.hour') as HTMLElement).style.transform = `rotate(${hour}deg)`;
  }

  formatMinute(){
    var minutes = this.date.getMinutes();
    const minute = (minutes + (this.date.getSeconds()/60))*6;
    (document.querySelector('.minute')as HTMLElement).style.transform = `rotate(${minute}deg)`;
  }

  formatSeconds(){
     var seconds = this.date.getSeconds(); 
    const second = seconds * 6;  
    (document.querySelector('.second')as HTMLElement).style.transform = `rotate(${second}deg)`;
  }

  



   
}