import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsWellnessMeasuresComponent } from './details-wellness-measures.component';

describe('DetailsWellnessMeasuresComponent', () => {
  let component: DetailsWellnessMeasuresComponent;
  let fixture: ComponentFixture<DetailsWellnessMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsWellnessMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsWellnessMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
