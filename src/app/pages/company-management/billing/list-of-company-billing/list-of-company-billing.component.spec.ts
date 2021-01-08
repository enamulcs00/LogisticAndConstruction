import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCompanyBillingComponent } from './list-of-company-billing.component';

describe('ListOfCompanyBillingComponent', () => {
  let component: ListOfCompanyBillingComponent;
  let fixture: ComponentFixture<ListOfCompanyBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfCompanyBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCompanyBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
