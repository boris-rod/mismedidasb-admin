import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAudienceComponent } from './group-audience.component';

describe('GroupAudienceComponent', () => {
  let component: GroupAudienceComponent;
  let fixture: ComponentFixture<GroupAudienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupAudienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
