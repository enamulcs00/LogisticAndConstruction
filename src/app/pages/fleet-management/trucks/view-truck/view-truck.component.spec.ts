import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTruckComponent } from './view-truck.component';

describe('ViewTruckComponent', () => {
  let component: ViewTruckComponent;
  let fixture: ComponentFixture<ViewTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
