import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBidByFleetOwnerComponent } from './list-of-bid-by-fleet-owner.component';

describe('ListOfBidByFleetOwnerComponent', () => {
  let component: ListOfBidByFleetOwnerComponent;
  let fixture: ComponentFixture<ListOfBidByFleetOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfBidByFleetOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBidByFleetOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
