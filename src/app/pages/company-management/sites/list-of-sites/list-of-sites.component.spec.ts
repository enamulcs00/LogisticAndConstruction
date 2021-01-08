import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSitesComponent } from './list-of-sites.component';

describe('ListOfSitesComponent', () => {
  let component: ListOfSitesComponent;
  let fixture: ComponentFixture<ListOfSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
