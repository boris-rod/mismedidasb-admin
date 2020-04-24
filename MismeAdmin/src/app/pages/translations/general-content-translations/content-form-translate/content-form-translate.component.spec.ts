import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFormTranslateComponent } from './content-form-translate.component';

describe('ContentFormTranslateComponent', () => {
  let component: ContentFormTranslateComponent;
  let fixture: ComponentFixture<ContentFormTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentFormTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFormTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
