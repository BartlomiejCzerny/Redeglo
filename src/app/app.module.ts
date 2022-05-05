import { AppRoutingModule } from './routes/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { StartComponent } from './start/start.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { BookingService } from './services/booking.service';
import { BookingComponent } from './booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FailedLoginDialogComponent } from './failed-login-dialog/failed-login-dialog.component';
import { FailedRegistrationDialogComponent } from './failed-registration-dialog/failed-registration-dialog.component';
import { AuthorizationRequiredComponent } from './authorization-required/authorization-required.component';
import { AddBookingDialogComponent } from './add-booking-dialog/add-booking-dialog.component';
import { EmailVerificationDialogComponent } from './email-verification-dialog/email-verification-dialog.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { FailedPasswordChangeDialogComponent } from './failed-password-change-dialog/failed-password-change-dialog.component';
import { ChangeEmailDialogComponent } from './change-email-dialog/change-email-dialog.component';
import { FailedEmailChangeDialogComponent } from './failed-email-change-dialog/failed-email-change-dialog.component';
import { FailedUserDeletionDialogComponent } from './failed-user-deletion-dialog/failed-user-deletion-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    DeleteUserDialogComponent,
    FailedUserDeletionDialogComponent,
    BookingComponent,
    FailedLoginDialogComponent,
    FailedRegistrationDialogComponent,
    AuthorizationRequiredComponent,
    AddBookingDialogComponent,
    EmailVerificationDialogComponent,
    ChangePasswordDialogComponent,
    FailedPasswordChangeDialogComponent,
    ChangeEmailDialogComponent,
    FailedEmailChangeDialogComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    FormsModule,
    RouterModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule
  ],
  providers: [BookingService],
  bootstrap: [AppComponent],
  entryComponents: [
    FailedRegistrationDialogComponent,
    FailedLoginDialogComponent,
    EmailVerificationDialogComponent,
    ChangePasswordDialogComponent,
    FailedPasswordChangeDialogComponent,
    ChangeEmailDialogComponent,
    FailedEmailChangeDialogComponent,
    DeleteUserDialogComponent,
    FailedUserDeletionDialogComponent,
    AddBookingDialogComponent
  ]
})
export class AppModule { }
