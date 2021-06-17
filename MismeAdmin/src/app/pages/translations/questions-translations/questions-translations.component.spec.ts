import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTranslationsComponent } from './questions-translations.component';

describe('QuestionsTranslationsComponent', () => {
  let component: QuestionsTranslationsComponent;
  let fixture: ComponentFixture<QuestionsTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsTranslationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
