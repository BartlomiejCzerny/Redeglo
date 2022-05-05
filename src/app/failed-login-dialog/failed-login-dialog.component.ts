import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-failed-login-dialog',
  templateUrl: './failed-login-dialog.component.html',
  styleUrls: ['./failed-login-dialog.component.css']
})
export class FailedLoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FailedLoginDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
