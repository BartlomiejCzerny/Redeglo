import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-failed-user-deletion-dialog',
  templateUrl: './failed-user-deletion-dialog.component.html',
  styleUrls: ['./failed-user-deletion-dialog.component.css']
})
export class FailedUserDeletionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FailedUserDeletionDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
