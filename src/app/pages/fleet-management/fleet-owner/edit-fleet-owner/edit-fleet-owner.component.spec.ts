import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFleetOwnerComponent } from './edit-fleet-owner.component';

describe('EditFleetOwnerComponent', () => {
  let component: EditFleetOwnerComponent;
  let fixture: ComponentFixture<EditFleetOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFleetOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFleetOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
