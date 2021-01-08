import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyBookingComponent } from './view-company-booking.component';

describe('ViewCompanyBookingComponent', () => {
  let component: ViewCompanyBookingComponent;
  let fixture: ComponentFixture<ViewCompanyBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompanyBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompanyBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
