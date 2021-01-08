import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCompanyBookingComponent } from './list-of-company-booking.component';

describe('ListOfCompanyBookingComponent', () => {
  let component: ListOfCompanyBookingComponent;
  let fixture: ComponentFixture<ListOfCompanyBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfCompanyBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCompanyBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
