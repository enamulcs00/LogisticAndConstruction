import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSitesComponent } from './add-sites.component';

describe('AddSitesComponent', () => {
  let component: AddSitesComponent;
  let fixture: ComponentFixture<AddSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
