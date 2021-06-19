import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptForTranslationComponent } from './concept-for-translation.component';

describe('ConceptForTranslationComponent', () => {
  let component: ConceptForTranslationComponent;
  let fixture: ComponentFixture<ConceptForTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptForTranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptForTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
