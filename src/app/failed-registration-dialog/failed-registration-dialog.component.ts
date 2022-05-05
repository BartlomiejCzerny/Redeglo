import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-failed-registration-dialog',
  templateUrl: './failed-registration-dialog.component.html',
  styleUrls: ['./failed-registration-dialog.component.css']
})
export class FailedRegistrationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FailedRegistrationDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
