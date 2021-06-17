import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersTranslationsComponent } from './reminders-translations.component';

describe('RemindersTranslationsComponent', () => {
  let component: RemindersTranslationsComponent;
  let fixture: ComponentFixture<RemindersTranslationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemindersTranslationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
