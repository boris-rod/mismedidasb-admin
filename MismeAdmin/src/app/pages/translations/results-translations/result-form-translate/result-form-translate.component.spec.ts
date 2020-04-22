import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFormTranslateComponent } from './result-form-translate.component';

describe('ResultFormTranslateComponent', () => {
  let component: ResultFormTranslateComponent;
  let fixture: ComponentFixture<ResultFormTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultFormTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultFormTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
