import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsValuesMeasuresComponent } from './details-values-measures.component';

describe('DetailsValuesMeasuresComponent', () => {
  let component: DetailsValuesMeasuresComponent;
  let fixture: ComponentFixture<DetailsValuesMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsValuesMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsValuesMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
