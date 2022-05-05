import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { FailedPasswordChangeDialogComponent } from './../failed-password-change-dialog/failed-password-change-dialog.component';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
  userData = {
    newPassword: '',
    confirmNewPassword: ''
  };

  hide = true;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  changePassword() {
    if (this.userData.newPassword === this.userData.confirmNewPassword) {
      this.authService.user.updatePassword(this.userData.newPassword).then(() => {
        this.closeDialog();
        this.snackBar.open(
          'Hasło zostało pomyślnie zmienione.', 'OK', {
            duration: 5000
          }
        );
      }).catch(() => this.openFailedPasswordChangeDialog());
    } else {
      this.openFailedPasswordChangeDialog();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openFailedPasswordChangeDialog() {
    const dialogRef = this.dialog.open(FailedPasswordChangeDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Okno zostało zamknięte.');
    });
  }

}
