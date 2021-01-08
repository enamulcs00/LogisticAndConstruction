import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTruckComponent } from './delete-truck.component';

describe('DeleteTruckComponent', () => {
  let component: DeleteTruckComponent;
  let fixture: ComponentFixture<DeleteTruckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTruckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
