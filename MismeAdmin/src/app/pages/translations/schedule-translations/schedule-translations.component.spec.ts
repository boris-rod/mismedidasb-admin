import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTranslationsComponent } from './schedule-translations.component';

describe('ScheduleTranslationsComponent', () => {
  let component: ScheduleTranslationsComponent;
  let fixture: ComponentFixture<ScheduleTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
