import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesSupplierComponent } from './quotes-supplier.component';

describe('QuotesSupplierComponent', () => {
  let component: QuotesSupplierComponent;
  let fixture: ComponentFixture<QuotesSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
