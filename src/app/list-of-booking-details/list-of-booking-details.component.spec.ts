import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBookingDetailsComponent } from './list-of-booking-details.component';

describe('ListOfBookingDetailsComponent', () => {
  let component: ListOfBookingDetailsComponent;
  let fixture: ComponentFixture<ListOfBookingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfBookingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
