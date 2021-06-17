import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsTranslationsComponent } from './polls-translations.component';

describe('PollsTranslationsComponent', () => {
  let component: PollsTranslationsComponent;
  let fixture: ComponentFixture<PollsTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollsTranslationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollsTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
