import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplerComponent } from './add-suppler.component';

describe('AddSupplerComponent', () => {
  let component: AddSupplerComponent;
  let fixture: ComponentFixture<AddSupplerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
