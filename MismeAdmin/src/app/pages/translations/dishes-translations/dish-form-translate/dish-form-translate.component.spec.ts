import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFormTranslateComponent } from './dish-form-translate.component';

describe('DishFormTranslateComponent', () => {
  let component: DishFormTranslateComponent;
  let fixture: ComponentFixture<DishFormTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishFormTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishFormTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
