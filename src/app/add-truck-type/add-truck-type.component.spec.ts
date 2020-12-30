import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTruckTypeComponent } from './add-truck-type.component';

describe('AddTruckTypeComponent', () => {
  let component: AddTruckTypeComponent;
  let fixture: ComponentFixture<AddTruckTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTruckTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTruckTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
