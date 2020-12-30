import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThermalPlantsComponent } from './add-thermal-plants.component';

describe('AddThermalPlantsComponent', () => {
  let component: AddThermalPlantsComponent;
  let fixture: ComponentFixture<AddThermalPlantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddThermalPlantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThermalPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
