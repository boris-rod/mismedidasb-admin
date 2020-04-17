import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollFormTranslateComponent } from './poll-form-translate.component';

describe('PollFormTranslateComponent', () => {
  let component: PollFormTranslateComponent;
  let fixture: ComponentFixture<PollFormTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollFormTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollFormTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
