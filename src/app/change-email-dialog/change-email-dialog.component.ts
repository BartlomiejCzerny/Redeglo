import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { FailedEmailChangeDialogComponent } from '../failed-email-change-dialog/failed-email-change-dialog.component';

@Component({
  selector: 'app-change-email-dialog',
  templateUrl: './change-email-dialog.component.html',
  styleUrls: ['./change-email-dialog.component.css']
})
export class ChangeEmailDialogComponent implements OnInit {
  userData = {
    newEmail: '',
    confirmNewEmail: ''
  };

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangeEmailDialogComponent>,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  changeEmail() {
    if (this.userData.newEmail === this.userData.confirmNewEmail) {
      this.authService.user.updateEmail(this.userData.newEmail).then(() => {
        this.closeDialog();
        this.snackBar.open(
          'Email został pomyślnie zmieniony.', 'OK', {
            duration: 5000
          }
        );
      }).then(() => this.authService.sendVerificationEmail())
      .catch(() => this.openFailedEmailChangeDialog());
    } else {
      this.openFailedEmailChangeDialog();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openFailedEmailChangeDialog() {
    const dialogRef = this.dialog.open(FailedEmailChangeDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Okno zostało zamknięte.');
    });
  }

}
