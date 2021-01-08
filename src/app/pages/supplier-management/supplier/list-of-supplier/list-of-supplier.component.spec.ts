import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSupplierComponent } from './list-of-supplier.component';

describe('ListOfSupplierComponent', () => {
  let component: ListOfSupplierComponent;
  let fixture: ComponentFixture<ListOfSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
