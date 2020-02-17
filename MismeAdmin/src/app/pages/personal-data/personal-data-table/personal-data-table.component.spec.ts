import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataTableComponent } from './personal-data-table.component';

describe('PersonalDataTableComponent', () => {
  let component: PersonalDataTableComponent;
  let fixture: ComponentFixture<PersonalDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
