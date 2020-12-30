import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSupplierComponent } from './billing-supplier.component';

describe('BillingSupplierComponent', () => {
  let component: BillingSupplierComponent;
  let fixture: ComponentFixture<BillingSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
