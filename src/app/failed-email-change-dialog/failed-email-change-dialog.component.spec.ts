import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedEmailChangeDialogComponent } from './failed-email-change-dialog.component';

describe('FailedEmailChangeDialogComponent', () => {
  let component: FailedEmailChangeDialogComponent;
  let fixture: ComponentFixture<FailedEmailChangeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedEmailChangeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedEmailChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
