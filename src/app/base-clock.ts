import { Directive } from "@angular/core";
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppState, millisecondSelector} from './app.state';
import { Store, select } from '@ngrx/store';
import {OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
@Directive({})
export abstract class BaseClock implements OnInit, OnDestroy{
  date: Date = new Date();
  millisecond: number = 0;
  form: FormGroup;
  subscription: Subscription;
  interval: number;

  readonly selectTime = 'selectTime';

  constructor(public fb: FormBuilder, public store: Store<AppState>) { 
  }

  ngOnInit(): void{
    //initialize form
    this.form = this.fb.group({
      selectTime: 0,
    });

    this.subscribeToStore();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  subscribeToStore(): void{
    this.subscription = this.store.pipe(select(millisecondSelector),tap(millisecond=> {
      clearInterval(this.interval);
      this.millisecond = millisecond;
      this.startClock();
    }))
    .subscribe();
  }

  startClock(): void{
    this.interval = setInterval(()=>{
      this.millisecond += 1000;
      this.date.setTime(this.millisecond);
      this.updateClock();
    }, 1000);
  }

  synchronize(): void{ // could be cleaned up  
    this.setCurrentTimeToSelectedTime();

    clearInterval(this.interval);
    
    this.dispatchAction();
    
    this.updateClockAndResetForm();
  }

  isSynchronizeDisabled(){
    return this.form.pristine || this.form.invalid;
  }

  updateClock(): void{
    this.formatHour();
    this.formatMinute();
    this.formatSeconds();
  }

  abstract dispatchAction(): void;

  abstract formatHour(): void;

  abstract formatMinute(): void;

  abstract formatSeconds(): void;

  private setCurrentTimeToSelectedTime(){
    const selectedTime = this.form.get(this.selectTime).value;
    const hourAndMin = selectedTime.split(":");
    this.date.setHours(hourAndMin[0] as number, hourAndMin[1] as number, 0);
  }


  private updateClockAndResetForm(){
    this.millisecond = this.date.getTime();
    this.form.get(this.selectTime).reset();
  }

}