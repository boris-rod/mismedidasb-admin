import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTranslationsComponent } from './question-translations.component';

describe('QuestionTranslationsComponent', () => {
  let component: QuestionTranslationsComponent;
  let fixture: ComponentFixture<QuestionTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
