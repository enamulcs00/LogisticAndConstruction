import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFleetOwnerComponent } from './list-of-fleet-owner.component';

describe('ListOfFleetOwnerComponent', () => {
  let component: ListOfFleetOwnerComponent;
  let fixture: ComponentFixture<ListOfFleetOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfFleetOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFleetOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
