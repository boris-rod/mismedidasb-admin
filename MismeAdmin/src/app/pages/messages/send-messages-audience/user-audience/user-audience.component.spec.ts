import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAudienceComponent } from './user-audience.component';

describe('UserAudienceComponent', () => {
  let component: UserAudienceComponent;
  let fixture: ComponentFixture<UserAudienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAudienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
