import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderTranslationsComponent } from './reminder-translations.component';

describe('ReminderTranslationsComponent', () => {
  let component: ReminderTranslationsComponent;
  let fixture: ComponentFixture<ReminderTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderTranslationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
