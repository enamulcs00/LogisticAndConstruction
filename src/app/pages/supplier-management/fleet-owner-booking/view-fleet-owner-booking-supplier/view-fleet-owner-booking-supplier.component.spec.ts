import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFleetOwnerBookingSupplierComponent } from './view-fleet-owner-booking-supplier.component';

describe('ViewFleetOwnerBookingSupplierComponent', () => {
  let component: ViewFleetOwnerBookingSupplierComponent;
  let fixture: ComponentFixture<ViewFleetOwnerBookingSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFleetOwnerBookingSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFleetOwnerBookingSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
