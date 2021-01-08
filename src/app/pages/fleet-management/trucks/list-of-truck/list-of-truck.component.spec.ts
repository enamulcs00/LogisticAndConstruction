import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTruckComponent } from './list-of-truck.component';

describe('ListOfTruckComponent', () => {
  let component: ListOfTruckComponent;
  let fixture: ComponentFixture<ListOfTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
