import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedPasswordChangeDialogComponent } from './failed-password-change-dialog.component';

describe('FailedPasswordChangeDialogComponent', () => {
  let component: FailedPasswordChangeDialogComponent;
  let fixture: ComponentFixture<FailedPasswordChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedPasswordChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedPasswordChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
