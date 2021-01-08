import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSupplierBookingComponent } from './list-of-supplier-booking.component';

describe('ListOfSupplierBookingComponent', () => {
  let component: ListOfSupplierBookingComponent;
  let fixture: ComponentFixture<ListOfSupplierBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfSupplierBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSupplierBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
