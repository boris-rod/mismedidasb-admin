import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsTranslationsComponent } from './tips-translations.component';

describe('TipsTranslationsComponent', () => {
  let component: TipsTranslationsComponent;
  let fixture: ComponentFixture<TipsTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipsTranslationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
