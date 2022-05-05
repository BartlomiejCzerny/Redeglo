import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FailedUserDeletionDialogComponent } from '../failed-user-deletion-dialog/failed-user-deletion-dialog.component';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>
  ) { }

  ngOnInit() {
  }

  deleteUser() {
    this.closeDialog();
    this.authService.user.delete().then(() => {
      this.router.navigate(['/start']);
      setTimeout(() => {
        this.snackBar.open(
          'Konto zostało pomyślnie usunięte.', 'OK', {
            duration: 5000
          }
        );
      }, 1000);
    }).catch(() => this.openFailedUserDeletionDialog());
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openFailedUserDeletionDialog() {
    const dialogRef = this.dialog.open(FailedUserDeletionDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Okno zostało zamknięte.');
    });
  }

}
