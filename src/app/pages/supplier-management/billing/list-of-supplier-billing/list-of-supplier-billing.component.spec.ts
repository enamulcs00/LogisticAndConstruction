import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSupplierBillingComponent } from './list-of-supplier-billing.component';

describe('ListOfSupplierBillingComponent', () => {
  let component: ListOfSupplierBillingComponent;
  let fixture: ComponentFixture<ListOfSupplierBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfSupplierBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSupplierBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
