import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueMeasuresComponent } from './value-measures.component';

describe('ValueMeasuresComponent', () => {
  let component: ValueMeasuresComponent;
  let fixture: ComponentFixture<ValueMeasuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueMeasuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
