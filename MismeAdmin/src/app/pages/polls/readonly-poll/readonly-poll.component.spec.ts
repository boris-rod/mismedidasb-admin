import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyPollComponent } from './readonly-poll.component';

describe('ReadonlyPollComponent', () => {
  let component: ReadonlyPollComponent;
  let fixture: ComponentFixture<ReadonlyPollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadonlyPollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
