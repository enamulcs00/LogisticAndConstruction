import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCompanyQuoteComponent } from './list-of-company-quote.component';

describe('ListOfCompanyQuoteComponent', () => {
  let component: ListOfCompanyQuoteComponent;
  let fixture: ComponentFixture<ListOfCompanyQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfCompanyQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCompanyQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
