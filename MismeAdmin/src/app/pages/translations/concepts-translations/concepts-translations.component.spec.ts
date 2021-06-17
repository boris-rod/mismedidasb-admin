import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptsTranslationsComponent } from './concepts-translations.component';

describe('ConceptsTranslationsComponent', () => {
  let component: ConceptsTranslationsComponent;
  let fixture: ComponentFixture<ConceptsTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptsTranslationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptsTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
