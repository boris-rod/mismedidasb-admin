import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormTranslateComponent } from './question-form-translate.component';

describe('QuestionFormTranslateComponent', () => {
  let component: QuestionFormTranslateComponent;
  let fixture: ComponentFixture<QuestionFormTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFormTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
