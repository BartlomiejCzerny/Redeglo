import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-email-verification-dialog',
  templateUrl: './email-verification-dialog.component.html',
  styleUrls: ['./email-verification-dialog.component.css']
})
export class EmailVerificationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmailVerificationDialogComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
