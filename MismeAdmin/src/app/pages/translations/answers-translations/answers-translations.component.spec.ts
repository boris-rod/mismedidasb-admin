import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersTranslationsComponent } from './answers-translations.component';

describe('AnswersTranslationsComponent', () => {
  let component: AnswersTranslationsComponent;
  let fixture: ComponentFixture<AnswersTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswersTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
