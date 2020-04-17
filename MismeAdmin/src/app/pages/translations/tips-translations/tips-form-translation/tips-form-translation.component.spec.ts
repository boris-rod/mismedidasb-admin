import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsFormTranslationComponent } from './tips-form-translation.component';

describe('TipsFormTranslationComponent', () => {
  let component: TipsFormTranslationComponent;
  let fixture: ComponentFixture<TipsFormTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsFormTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsFormTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
