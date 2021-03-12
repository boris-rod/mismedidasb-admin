import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSendCoinsComponent } from './user-send-coins.component';

describe('UserSendCoinsComponent', () => {
  let component: UserSendCoinsComponent;
  let fixture: ComponentFixture<UserSendCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSendCoinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSendCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
