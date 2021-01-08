import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyQuoteComponent } from './view-company-quote.component';

describe('ViewCompanyQuoteComponent', () => {
  let component: ViewCompanyQuoteComponent;
  let fixture: ComponentFixture<ViewCompanyQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompanyQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompanyQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
