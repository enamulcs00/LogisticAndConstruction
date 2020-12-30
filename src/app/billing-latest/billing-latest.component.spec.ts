import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingLatestComponent } from './billing-latest.component';

describe('BillingLatestComponent', () => {
  let component: BillingLatestComponent;
  let fixture: ComponentFixture<BillingLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
