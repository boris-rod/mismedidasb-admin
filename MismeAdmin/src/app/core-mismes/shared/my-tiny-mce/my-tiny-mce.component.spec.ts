import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTinyMceComponent } from './my-tiny-mce.component';

describe('MyTinyMceComponent', () => {
  let component: MyTinyMceComponent;
  let fixture: ComponentFixture<MyTinyMceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTinyMceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTinyMceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
