import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFleetOwnerComponent } from './view-fleet-owner.component';

describe('ViewFleetOwnerComponent', () => {
  let component: ViewFleetOwnerComponent;
  let fixture: ComponentFixture<ViewFleetOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFleetOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFleetOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
