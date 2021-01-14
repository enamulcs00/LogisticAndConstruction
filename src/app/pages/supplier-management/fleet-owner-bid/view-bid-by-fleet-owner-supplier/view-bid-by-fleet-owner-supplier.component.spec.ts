import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBidByFleetOwnerSupplierComponent } from './view-bid-by-fleet-owner-supplier.component';

describe('ViewBidByFleetOwnerSupplierComponent', () => {
  let component: ViewBidByFleetOwnerSupplierComponent;
  let fixture: ComponentFixture<ViewBidByFleetOwnerSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBidByFleetOwnerSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBidByFleetOwnerSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
