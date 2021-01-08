import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplierBillingComponent } from './view-supplier-billing.component';

describe('ViewSupplierBillingComponent', () => {
  let component: ViewSupplierBillingComponent;
  let fixture: ComponentFixture<ViewSupplierBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSupplierBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplierBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
