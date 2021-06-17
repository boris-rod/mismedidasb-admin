import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsForTranslationComponent } from './tips-for-translation.component';

describe('TipsForTranslationComponent', () => {
  let component: TipsForTranslationComponent;
  let fixture: ComponentFixture<TipsForTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipsForTranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsForTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
