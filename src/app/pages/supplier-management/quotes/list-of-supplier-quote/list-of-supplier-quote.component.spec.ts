import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSupplierQuoteComponent } from './list-of-supplier-quote.component';

describe('ListOfSupplierQuoteComponent', () => {
  let component: ListOfSupplierQuoteComponent;
  let fixture: ComponentFixture<ListOfSupplierQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfSupplierQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSupplierQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
