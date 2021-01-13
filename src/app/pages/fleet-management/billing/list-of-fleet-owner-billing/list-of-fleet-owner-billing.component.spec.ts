import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFleetOwnerBillingComponent } from './list-of-fleet-owner-billing.component';

describe('ListOfFleetOwnerBillingComponent', () => {
  let component: ListOfFleetOwnerBillingComponent;
  let fixture: ComponentFixture<ListOfFleetOwnerBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfFleetOwnerBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFleetOwnerBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
