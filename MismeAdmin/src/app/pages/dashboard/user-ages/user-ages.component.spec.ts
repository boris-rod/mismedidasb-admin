import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgesComponent } from './user-ages.component';

describe('UserAgesComponent', () => {
  let component: UserAgesComponent;
  let fixture: ComponentFixture<UserAgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAgesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
