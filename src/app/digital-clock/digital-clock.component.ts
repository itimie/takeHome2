import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState, millisecondSelector } from './../app.state';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import * as SynchronizeActions from './../actions/synchronize.actions';
import { SynchronizeState } from '../models/synchronize.model';
import {BaseClock} from './../base-clock';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent extends BaseClock implements OnInit, OnDestroy {
  hour: string;
  minute: string;
  second: string;
  ampm: string;
  
  constructor(private fb: FormBuilder, private store: Store<AppState>) { 
    super(fb, store);
  }

  ngOnInit(){
    super.ngOnInit();
  }

  ngOnDestroy(){
    super.ngOnDestroy();
  }

  dispatchAction(){
    this.store.dispatch(new SynchronizeActions.SynchronizeDigitalAction({millisecond: this.date.getTime()}));
  }

  private updateClock(): void{
    this.formatHour();
    this.formatMinute();
    this.formatSeconds();
  }
  
  private formatHour(): void{
    const hours = this.date.getHours();
    this.hour = hours < 10 ? '0' + hours : `${hours > 12 ? '0'+hours %12: hours}`;
    this.ampm = hours < 12 ? 'AM': 'PM';
  }

  private formatMinute(): void {
    const minutes = this.date.getMinutes();
    this.minute = minutes < 10  ? '0'+ minutes: `${minutes}`;
  }

  private formatSeconds(): void{
    const seconds = this.date.getSeconds();
    this.second = seconds < 10 ? '0'+ seconds : `${this.date.getSeconds()}`;
  }
}

