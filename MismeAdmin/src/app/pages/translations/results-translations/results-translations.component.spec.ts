import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsTranslationsComponent } from './results-translations.component';

describe('ResultsTranslationsComponent', () => {
  let component: ResultsTranslationsComponent;
  let fixture: ComponentFixture<ResultsTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsTranslationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
