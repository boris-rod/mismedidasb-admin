import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDayPlanComponent } from './one-day-plan.component';

describe('OneDayPlanComponent', () => {
  let component: OneDayPlanComponent;
  let fixture: ComponentFixture<OneDayPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneDayPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDayPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
