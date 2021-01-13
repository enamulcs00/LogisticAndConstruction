import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFleetOwnerBillingSupplierComponent } from './list-of-fleet-owner-billing-supplier.component';

describe('ListOfFleetOwnerBillingSupplierComponent', () => {
  let component: ListOfFleetOwnerBillingSupplierComponent;
  let fixture: ComponentFixture<ListOfFleetOwnerBillingSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfFleetOwnerBillingSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFleetOwnerBillingSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
