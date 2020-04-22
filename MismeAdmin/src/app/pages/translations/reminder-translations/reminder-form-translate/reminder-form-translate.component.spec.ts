import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderFormTranslateComponent } from './reminder-form-translate.component';

describe('ReminderFormTranslateComponent', () => {
  let component: ReminderFormTranslateComponent;
  let fixture: ComponentFixture<ReminderFormTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderFormTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderFormTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
