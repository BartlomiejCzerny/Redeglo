import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FailedRegistrationDialogComponent } from '../failed-registration-dialog/failed-registration-dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userData = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  hide = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  register() {
    if (this.userData.password === this.userData.confirmPassword) {
      this.authService.register(this.userData)
        .then(() => this.router.navigate(['/dashboard']))
        .catch(() => this.openFailedRegistrationDialog());
    } else {
      this.openFailedRegistrationDialog();
    }
  }

  openFailedRegistrationDialog() {
    const dialogRef = this.dialog.open(FailedRegistrationDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Okno zostało zamknięte.');
    });
  }

}
