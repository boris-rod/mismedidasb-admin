import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralContentForTranslationComponent } from './general-content-for-translation.component';

describe('GeneralContentForTranslationComponent', () => {
  let component: GeneralContentForTranslationComponent;
  let fixture: ComponentFixture<GeneralContentForTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralContentForTranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralContentForTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
