import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionForTranslationComponent } from './question-for-translation.component';

describe('QuestionForTranslationComponent', () => {
  let component: QuestionForTranslationComponent;
  let fixture: ComponentFixture<QuestionForTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionForTranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionForTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
