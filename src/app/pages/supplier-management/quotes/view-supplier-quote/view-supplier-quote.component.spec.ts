import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplierQuoteComponent } from './view-supplier-quote.component';

describe('ViewSupplierQuoteComponent', () => {
  let component: ViewSupplierQuoteComponent;
  let fixture: ComponentFixture<ViewSupplierQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSupplierQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplierQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
