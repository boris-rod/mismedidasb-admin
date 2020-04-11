import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableUserComponent } from './disable-user.component';

describe('DisableUserComponent', () => {
  let component: DisableUserComponent;
  let fixture: ComponentFixture<DisableUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisableUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
