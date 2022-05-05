import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-failed-email-change-dialog',
  templateUrl: './failed-email-change-dialog.component.html',
  styleUrls: ['./failed-email-change-dialog.component.css']
})
export class FailedEmailChangeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FailedEmailChangeDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
