import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatStatsComponent } from './eat-stats.component';

describe('EatStatsComponent', () => {
  let component: EatStatsComponent;
  let fixture: ComponentFixture<EatStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
