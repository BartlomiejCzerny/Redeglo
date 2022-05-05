import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from './../services/booking.service';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AddBookingDialogComponent } from '../add-booking-dialog/add-booking-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  email: string;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.email = this.authService.user.email;
  }

  bookingData: MatTableDataSource<any>;
  displayedColumns = ['date', 'startTime', 'endTime', 'firstName', 'lastName', 'persons'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  mobile: boolean;

  ngOnInit() {
    if (window.screen.width <= 600) { // 768px portrait
      this.mobile = true;
    }
    this.bookingService.getBookings()
      .subscribe(
        bookingList => {
          const bookingArray = bookingList.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            };
          })
          .map(booking => ({
            ...booking,
            date: formatDate(booking.date, 'mediumDate', 'pl')
          }));
          this.bookingData = new MatTableDataSource(bookingArray);
          this.bookingData.sort = this.sort;
          this.bookingData.paginator = this.paginator;
        });
  }

  book() {
    if (this.bookingService.bookingForm.valid) {
      this.bookingService.addBooking(this.bookingService.bookingForm.value);
      this.clearBookingForm();
    }
  }

  clearBookingForm() {
    this.bookingService.bookingForm.reset();
    this.bookingService.initializeBookingForm();
  }

  clearSearchKey() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.bookingData.filter = this.searchKey.trim().toLowerCase();
  }

  openAddBookingDialog() {
    const dialogRef = this.dialog.open(AddBookingDialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Okno zostało zamknięte.');
    });
  }

}
