import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessMeasuresComponent } from './wellness-measures.component';

describe('WellnessMeasuresComponent', () => {
  let component: WellnessMeasuresComponent;
  let fixture: ComponentFixture<WellnessMeasuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellnessMeasuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnessMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
