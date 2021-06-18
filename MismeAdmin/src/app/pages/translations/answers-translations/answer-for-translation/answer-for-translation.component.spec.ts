import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerForTranslationComponent } from './answer-for-translation.component';

describe('AnswerForTranslationComponent', () => {
  let component: AnswerForTranslationComponent;
  let fixture: ComponentFixture<AnswerForTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerForTranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerForTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
