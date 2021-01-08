import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermalPlantsComponent } from './thermal-plants.component';

describe('ThermalPlantsComponent', () => {
  let component: ThermalPlantsComponent;
  let fixture: ComponentFixture<ThermalPlantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThermalPlantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThermalPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
