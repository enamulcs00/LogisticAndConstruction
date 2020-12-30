import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingSupplierComponent } from './my-booking-supplier.component';

describe('MyBookingSupplierComponent', () => {
  let component: MyBookingSupplierComponent;
  let fixture: ComponentFixture<MyBookingSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBookingSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
