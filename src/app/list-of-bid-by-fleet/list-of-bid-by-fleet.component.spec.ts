import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBidByFleetComponent } from './list-of-bid-by-fleet.component';

describe('ListOfBidByFleetComponent', () => {
  let component: ListOfBidByFleetComponent;
  let fixture: ComponentFixture<ListOfBidByFleetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfBidByFleetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBidByFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
