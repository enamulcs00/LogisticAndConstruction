import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFleetOwnerBookingSupplierComponent } from './list-of-fleet-owner-booking-supplier.component';

describe('ListOfFleetOwnerBookingSupplierComponent', () => {
  let component: ListOfFleetOwnerBookingSupplierComponent;
  let fixture: ComponentFixture<ListOfFleetOwnerBookingSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfFleetOwnerBookingSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFleetOwnerBookingSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
