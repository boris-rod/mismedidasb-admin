import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderForTranslationComponent } from './reminder-for-translation.component';

describe('ReminderForTranslationComponent', () => {
  let component: ReminderForTranslationComponent;
  let fixture: ComponentFixture<ReminderForTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderForTranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderForTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
