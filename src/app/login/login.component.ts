import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FailedLoginDialogComponent } from './../failed-login-dialog/failed-login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData = {
    email: '',
    password: ''
  };

  hide = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.userData)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(
        err => {
          this.openFailedLoginDialog();
        }
      );
  }

  openFailedLoginDialog() {
    const dialogRef = this.dialog.open(FailedLoginDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Okno zostało zamknięte.');
    });
  }

}
