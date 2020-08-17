import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './../app.component';
import { AppModule } from './../app.module';
import { DigitalClockComponent } from './digital-clock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store , StoreModule} from '@ngrx/store';

describe('DigitalClockComponent', () => {
  let fixture;
  let component;
  let nativeElement;

  let subscribeToStoreSpy: Spy;
  let synchronizeSpy: spy;
  let storeSpy: spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, StoreModule.forRoot({})],
      providers: [Store],
      declarations: [DigitalClockComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(DigitalClockComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    subscribeToStoreSpy = spyOn(component, 'subscribeToStore');
    synchronizeSpy = spyOn(component, 'synchronize');
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
    expect(component).toBeTruthy();
    expect(nativeElement.querySelector('form')).toBeTruthy();
  });

  it('should have date set to the current date', () =>{
    expect(component.milliseconds).not.toEqual(0);
  });

  it('should have subscribed to store', ()=> {
    expect(subscribeToStoreSpy).toHaveBeenCalled();
  });

  it('synchronize button should be disabled if no value selected and after button has been clicked', ()=> {
    expect(component.isSynchronizeDisabled()).toEqual(true);
    component.form.markAsDirty();
    expect(component.isSynchronizeDisabled()).toEqual(false);
    component.form.markAsPristine();
    expect(component.isSynchronizeDisabled()).toEqual(true);
  });

  xit('should dispatch the synchronize action and update the time accordingly', () => {
    storeSpy = spyOn(TestBed.get(Store), 'dispatch');

    component.digitalTimeForm.setValue({selectTime: "10:00"});
    fixture.detectChanges();
    const syncButton = nativeElement.querySelector('button');

    syncButton.click();
    expect(storeSpy, 'dispatch').toHaveBeenCalled();
  })


});
