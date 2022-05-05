import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedRegistrationDialogComponent } from './failed-registration-dialog.component';

describe('FailedRegistrationDialogComponent', () => {
  let component: FailedRegistrationDialogComponent;
  let fixture: ComponentFixture<FailedRegistrationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedRegistrationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedRegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
