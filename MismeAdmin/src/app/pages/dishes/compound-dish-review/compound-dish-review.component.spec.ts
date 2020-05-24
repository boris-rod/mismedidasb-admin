import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundDishReviewComponent } from './compound-dish-review.component';

describe('CompoundDishReviewComponent', () => {
  let component: CompoundDishReviewComponent;
  let fixture: ComponentFixture<CompoundDishReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundDishReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundDishReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
