import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedUserDeletionDialogComponent } from './failed-user-deletion-dialog.component';

describe('FailedUserDeletionDialogComponent', () => {
  let component: FailedUserDeletionDialogComponent;
  let fixture: ComponentFixture<FailedUserDeletionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedUserDeletionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedUserDeletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
