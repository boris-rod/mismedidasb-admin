import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupUsersCalendarComponent } from './group-users-calendar.component';

describe('GroupUsersCalendarComponent', () => {
  let component: GroupUsersCalendarComponent;
  let fixture: ComponentFixture<GroupUsersCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupUsersCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupUsersCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
