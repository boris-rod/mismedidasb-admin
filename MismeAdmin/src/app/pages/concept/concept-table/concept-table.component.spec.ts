import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptTableComponent } from './concept-table.component';

describe('ConceptTableComponent', () => {
  let component: ConceptTableComponent;
  let fixture: ComponentFixture<ConceptTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
