import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollForTranslationComponent } from './poll-for-translation.component';

describe('PollForTranslationComponent', () => {
  let component: PollForTranslationComponent;
  let fixture: ComponentFixture<PollForTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollForTranslationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollForTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
