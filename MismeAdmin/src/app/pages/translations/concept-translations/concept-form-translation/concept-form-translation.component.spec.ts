import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptFormTranslationComponent } from './concept-form-translation.component';

describe('ConceptFormTranslationComponent', () => {
  let component: ConceptFormTranslationComponent;
  let fixture: ComponentFixture<ConceptFormTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptFormTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptFormTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
