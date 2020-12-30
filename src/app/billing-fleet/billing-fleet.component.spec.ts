import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingFleetComponent } from './billing-fleet.component';

describe('BillingFleetComponent', () => {
  let component: BillingFleetComponent;
  let fixture: ComponentFixture<BillingFleetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingFleetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
