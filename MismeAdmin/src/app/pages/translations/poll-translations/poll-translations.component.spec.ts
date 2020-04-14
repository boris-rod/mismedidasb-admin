import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollTranslationsComponent } from './poll-translations.component';

describe('PollTranslationsComponent', () => {
  let component: PollTranslationsComponent;
  let fixture: ComponentFixture<PollTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
