import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptTranslationsComponent } from './concept-translations.component';

describe('ConceptTranslationsComponent', () => {
  let component: ConceptTranslationsComponent;
  let fixture: ComponentFixture<ConceptTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
