import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFleetOwnerComponent } from './delete-fleet-owner.component';

describe('DeleteFleetOwnerComponent', () => {
  let component: DeleteFleetOwnerComponent;
  let fixture: ComponentFixture<DeleteFleetOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFleetOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFleetOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
