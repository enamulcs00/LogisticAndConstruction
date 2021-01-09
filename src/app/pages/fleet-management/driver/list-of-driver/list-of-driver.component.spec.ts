import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDriverComponent } from './list-of-driver.component';

describe('ListOfDriverComponent', () => {
  let component: ListOfDriverComponent;
  let fixture: ComponentFixture<ListOfDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
