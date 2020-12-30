import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRollManagementComponent } from './user-roll-management.component';

describe('UserRollManagementComponent', () => {
  let component: UserRollManagementComponent;
  let fixture: ComponentFixture<UserRollManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRollManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRollManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
