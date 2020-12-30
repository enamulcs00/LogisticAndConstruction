import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBidToFleetOwnerComponent } from './list-of-bid-to-fleet-owner.component';

describe('ListOfBidToFleetOwnerComponent', () => {
  let component: ListOfBidToFleetOwnerComponent;
  let fixture: ComponentFixture<ListOfBidToFleetOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfBidToFleetOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBidToFleetOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
