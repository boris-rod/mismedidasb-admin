import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralContentTranslationsComponent } from './general-content-translations.component';

describe('GeneralContentTranslationsComponent', () => {
  let component: GeneralContentTranslationsComponent;
  let fixture: ComponentFixture<GeneralContentTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralContentTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralContentTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
