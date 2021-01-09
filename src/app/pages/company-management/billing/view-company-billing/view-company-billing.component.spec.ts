import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyBillingComponent } from './view-company-billing.component';

describe('ViewCompanyBillingComponent', () => {
  let component: ViewCompanyBillingComponent;
  let fixture: ComponentFixture<ViewCompanyBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompanyBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompanyBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
