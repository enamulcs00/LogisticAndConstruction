import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrushersAndMiningInfoComponent } from './crushers-and-mining-info.component';

describe('CrushersAndMiningInfoComponent', () => {
  let component: CrushersAndMiningInfoComponent;
  let fixture: ComponentFixture<CrushersAndMiningInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrushersAndMiningInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrushersAndMiningInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
