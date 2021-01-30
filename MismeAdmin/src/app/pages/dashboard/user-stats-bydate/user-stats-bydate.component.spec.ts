import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStatsBydateComponent } from './user-stats-bydate.component';

describe('UserStatsBydateComponent', () => {
  let component: UserStatsBydateComponent;
  let fixture: ComponentFixture<UserStatsBydateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStatsBydateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatsBydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
