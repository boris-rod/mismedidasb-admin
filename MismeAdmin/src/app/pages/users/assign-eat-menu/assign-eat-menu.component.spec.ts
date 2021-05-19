import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEatMenuComponent } from './assign-eat-menu.component';

describe('AssignEatMenuComponent', () => {
  let component: AssignEatMenuComponent;
  let fixture: ComponentFixture<AssignEatMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignEatMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEatMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
