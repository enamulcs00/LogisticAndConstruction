import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplierBookingComponent } from './view-supplier-booking.component';

describe('ViewSupplierBookingComponent', () => {
  let component: ViewSupplierBookingComponent;
  let fixture: ComponentFixture<ViewSupplierBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSupplierBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplierBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
