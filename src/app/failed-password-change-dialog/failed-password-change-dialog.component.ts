import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-failed-password-change-dialog',
  templateUrl: './failed-password-change-dialog.component.html',
  styleUrls: ['./failed-password-change-dialog.component.css']
})
export class FailedPasswordChangeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FailedPasswordChangeDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
