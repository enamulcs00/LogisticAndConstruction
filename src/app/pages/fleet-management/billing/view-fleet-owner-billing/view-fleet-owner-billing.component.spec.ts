import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFleetOwnerBillingComponent } from './view-fleet-owner-billing.component';

describe('ViewFleetOwnerBillingComponent', () => {
  let component: ViewFleetOwnerBillingComponent;
  let fixture: ComponentFixture<ViewFleetOwnerBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFleetOwnerBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFleetOwnerBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
