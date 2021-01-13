import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBidByFleetOwnerSupplierComponent } from './list-of-bid-by-fleet-owner-supplier.component';

describe('ListOfBidByFleetOwnerSupplierComponent', () => {
  let component: ListOfBidByFleetOwnerSupplierComponent;
  let fixture: ComponentFixture<ListOfBidByFleetOwnerSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfBidByFleetOwnerSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBidByFleetOwnerSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
