import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSitesComponent } from './view-sites.component';

describe('ViewSitesComponent', () => {
  let component: ViewSitesComponent;
  let fixture: ComponentFixture<ViewSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
