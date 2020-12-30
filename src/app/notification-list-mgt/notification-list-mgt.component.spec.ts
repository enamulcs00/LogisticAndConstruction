import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationListMgtComponent } from './notification-list-mgt.component';

describe('NotificationListMgtComponent', () => {
  let component: NotificationListMgtComponent;
  let fixture: ComponentFixture<NotificationListMgtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationListMgtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationListMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
