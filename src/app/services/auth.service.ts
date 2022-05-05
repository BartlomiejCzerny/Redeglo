import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserData } from '../../interfaces/UserData';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EmailVerificationDialogComponent } from '../email-verification-dialog/email-verification-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  constructor(
    private fireAuth: AngularFireAuth,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  login({ email, password }: UserData) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          this.logout();
          this.openEmailVerificationDialog();
        }
      });
  }

  register({ email, password }: UserData) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.snackBar.open(
          'Konto zostało pomyślnie utworzone.', 'OK', {
            duration: 5000
          }
        );

        setTimeout(() => {
          this.sendVerificationEmail();
        }, 5000);
      });
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }

  sendVerificationEmail() {
    return this.fireAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.openEmailVerificationDialog();
      });
  }

  openEmailVerificationDialog() {
    const dialogRef = this.dialog.open(EmailVerificationDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Okno zostało zamknięte.');
    });
  }

}
