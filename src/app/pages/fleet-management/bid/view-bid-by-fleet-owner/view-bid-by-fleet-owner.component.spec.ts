import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBidByFleetOwnerComponent } from './view-bid-by-fleet-owner.component';

describe('ViewBidByFleetOwnerComponent', () => {
  let component: ViewBidByFleetOwnerComponent;
  let fixture: ComponentFixture<ViewBidByFleetOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBidByFleetOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBidByFleetOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
