import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFleetOwnerBookingComponent } from './list-of-fleet-owner-booking.component';

describe('ListOfFleetOwnerBookingComponent', () => {
  let component: ListOfFleetOwnerBookingComponent;
  let fixture: ComponentFixture<ListOfFleetOwnerBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfFleetOwnerBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFleetOwnerBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
