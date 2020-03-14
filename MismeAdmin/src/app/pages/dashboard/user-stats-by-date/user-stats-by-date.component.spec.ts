import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatsByDateComponent } from './user-stats-by-date.component';

describe('UserStatsByDateComponent', () => {
  let component: UserStatsByDateComponent;
  let fixture: ComponentFixture<UserStatsByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStatsByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
