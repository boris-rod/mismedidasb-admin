import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerFormTranslateComponent } from './answer-form-translate.component';

describe('AnswerFormTranslateComponent', () => {
  let component: AnswerFormTranslateComponent;
  let fixture: ComponentFixture<AnswerFormTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerFormTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerFormTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
