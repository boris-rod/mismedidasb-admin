import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEatsComponent } from './details-eats.component';

describe('DetailsEatsComponent', () => {
  let component: DetailsEatsComponent;
  let fixture: ComponentFixture<DetailsEatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
