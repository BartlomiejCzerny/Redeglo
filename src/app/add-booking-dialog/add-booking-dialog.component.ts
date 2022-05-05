import { Component, OnInit } from '@angular/core';
import { BookingService } from './../services/booking.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-booking-dialog',
  templateUrl: './add-booking-dialog.component.html',
  styleUrls: ['./add-booking-dialog.component.css']
})
export class AddBookingDialogComponent implements OnInit {

  freeSlots = [];

  constructor(
    private bookingService: BookingService,
    public dialogRef: MatDialogRef<AddBookingDialogComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.bookingService.initializeBookingForm();
    this.bookingService.getFreeSlots().subscribe(freeSlots => {
      this.freeSlots = freeSlots;
    });
  }

  book() {
    if (this.bookingService.bookingForm.valid) {
      this.bookingService.addBooking(this.bookingService.bookingForm.value);
      this.clearBookingForm();
      this.closeDialog();
      this.snackBar.open(
        'Orlik został pomyślnie zarezerwowany.', 'OK', {
          duration: 5000
        }
      );
    }
  }

  clearBookingForm() {
    this.bookingService.bookingForm.reset();
    this.bookingService.initializeBookingForm();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  filterDate(): (date: Date) => boolean {
    return (date: Date) => {
      date.setHours(4);
      const now = new Date();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      return date >= now && this.freeSlots.some(slot => {
        const startDate = new Date(slot.startTime);
        startDate.setHours(0);
        startDate.setMinutes(0);
        const endDate = new Date(slot.endTime);
        endDate.setHours(0);
        endDate.setMinutes(0);
        return date >= startDate && (date <= endDate || slot.endTime == null);
      });
    };
  }
}
