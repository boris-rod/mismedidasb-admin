import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollTipsComponent } from './poll-tips.component';

describe('PollTipsComponent', () => {
  let component: PollTipsComponent;
  let fixture: ComponentFixture<PollTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
