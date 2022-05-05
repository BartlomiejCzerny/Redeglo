import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { ChangeEmailDialogComponent } from '../change-email-dialog/change-email-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user = this.authService.user;

  email: string;

  userData = {
    password: '',
    confirmPassword: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.email = this.authService.user.email;
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));

    setTimeout(() => {
      this.snackBar.open(
        'Nastąpiło pomyślne wylogowanie.', 'OK', {
          duration: 5000
        }
      );
    }, 1000);
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Okno zostało zamknięte.');
    });
  }

  openChangeEmailDialog() {
    const dialogRef = this.dialog.open(ChangeEmailDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Okno zostało zamknięte.');
    });
  }

  openDeleteUserDialog() {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Okno zostało zamknięte.');
    });
  }

}
