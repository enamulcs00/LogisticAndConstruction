import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyUserComponent } from './view-company-user.component';

describe('ViewCompanyUserComponent', () => {
  let component: ViewCompanyUserComponent;
  let fixture: ComponentFixture<ViewCompanyUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompanyUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompanyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
