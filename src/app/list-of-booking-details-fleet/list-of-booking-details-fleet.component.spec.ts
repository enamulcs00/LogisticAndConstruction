import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBookingDetailsFleetComponent } from './list-of-booking-details-fleet.component';

describe('ListOfBookingDetailsFleetComponent', () => {
  let component: ListOfBookingDetailsFleetComponent;
  let fixture: ComponentFixture<ListOfBookingDetailsFleetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfBookingDetailsFleetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBookingDetailsFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
