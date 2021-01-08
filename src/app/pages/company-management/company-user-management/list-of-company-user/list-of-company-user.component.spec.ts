import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCompanyUserComponent } from './list-of-company-user.component';

describe('ListOfCompanyUserComponent', () => {
  let component: ListOfCompanyUserComponent;
  let fixture: ComponentFixture<ListOfCompanyUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfCompanyUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCompanyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
