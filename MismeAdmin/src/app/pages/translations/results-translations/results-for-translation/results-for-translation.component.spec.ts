import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsForTranslationComponent } from './results-for-translation.component';

describe('ResultsForTranslationComponent', () => {
  let component: ResultsForTranslationComponent;
  let fixture: ComponentFixture<ResultsForTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsForTranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsForTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
