import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDishComponent } from './review-dish.component';

describe('ReviewDishComponent', () => {
  let component: ReviewDishComponent;
  let fixture: ComponentFixture<ReviewDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
