import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompanyUserComponent } from './delete-company-user.component';

describe('DeleteCompanyUserComponent', () => {
  let component: DeleteCompanyUserComponent;
  let fixture: ComponentFixture<DeleteCompanyUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCompanyUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCompanyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
