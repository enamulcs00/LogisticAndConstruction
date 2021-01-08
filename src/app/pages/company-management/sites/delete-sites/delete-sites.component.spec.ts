import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSitesComponent } from './delete-sites.component';

describe('DeleteSitesComponent', () => {
  let component: DeleteSitesComponent;
  let fixture: ComponentFixture<DeleteSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
