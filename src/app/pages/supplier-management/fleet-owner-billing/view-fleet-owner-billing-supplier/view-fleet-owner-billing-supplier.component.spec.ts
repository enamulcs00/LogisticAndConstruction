import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFleetOwnerBillingSupplierComponent } from './view-fleet-owner-billing-supplier.component';

describe('ViewFleetOwnerBillingSupplierComponent', () => {
  let component: ViewFleetOwnerBillingSupplierComponent;
  let fixture: ComponentFixture<ViewFleetOwnerBillingSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFleetOwnerBillingSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFleetOwnerBillingSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
