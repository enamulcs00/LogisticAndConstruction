import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFleetOwnerBookingComponent } from './view-fleet-owner-booking.component';

describe('ViewFleetOwnerBookingComponent', () => {
  let component: ViewFleetOwnerBookingComponent;
  let fixture: ComponentFixture<ViewFleetOwnerBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFleetOwnerBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFleetOwnerBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
