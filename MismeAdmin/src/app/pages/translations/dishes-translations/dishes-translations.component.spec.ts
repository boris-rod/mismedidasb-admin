import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesTranslationsComponent } from './dishes-translations.component';

describe('DishesTranslationsComponent', () => {
  let component: DishesTranslationsComponent;
  let fixture: ComponentFixture<DishesTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishesTranslationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
