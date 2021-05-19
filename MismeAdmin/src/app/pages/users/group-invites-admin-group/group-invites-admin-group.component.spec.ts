import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInvitesAdminGroupComponent } from './group-invites-admin-group.component';

describe('GroupInvitesAdminGroupComponent', () => {
  let component: GroupInvitesAdminGroupComponent;
  let fixture: ComponentFixture<GroupInvitesAdminGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupInvitesAdminGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupInvitesAdminGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
