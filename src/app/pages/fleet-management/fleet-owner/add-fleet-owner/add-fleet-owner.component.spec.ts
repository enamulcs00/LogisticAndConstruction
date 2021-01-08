import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFleetOwnerComponent } from './add-fleet-owner.component';

describe('AddFleetOwnerComponent', () => {
  let component: AddFleetOwnerComponent;
  let fixture: ComponentFixture<AddFleetOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFleetOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFleetOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
