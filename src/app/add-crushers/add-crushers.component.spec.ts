import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCrushersComponent } from './add-crushers.component';

describe('AddCrushersComponent', () => {
  let component: AddCrushersComponent;
  let fixture: ComponentFixture<AddCrushersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCrushersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCrushersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
