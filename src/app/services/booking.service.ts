import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  email: string;

  bookingList: AngularFireList<any>;
  bookingArray = [];
  freeSlots = [];

  constructor(
    private firebase: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.bookingList = this.firebase.list('bookings');
    this.bookingList.snapshotChanges().subscribe(list => {
      this.bookingArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
    this.getFreeSlots().subscribe(freeSlots => {
      this.freeSlots = freeSlots;
    });
  }

  bookingForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    date: new FormControl('', Validators.required),
    startTime: new FormControl('', [
      Validators.required,
      Validators.min(9),
      Validators.max(21),
      this.validStartTime()
    ]),
    endTime: new FormControl('', [
      Validators.required,
      Validators.min(10),
      Validators.max(22),
      this.validEndTime()
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*')
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*')
    ]),
    place: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*')
    ]),
    street: new FormControl('',
      Validators.pattern('[a-zA-Z- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*')
    ),
    houseNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9a-zA-Z /]*')
    ]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{2}-[0-9]{3}')
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{9}')
    ]),
    persons: new FormControl('', [
      Validators.required,
      Validators.min(4),
      Validators.max(25)
    ]),
    institution: new FormControl('', Validators.pattern('[0-9a-zA-Z-. ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*')),
    personalData: new FormControl(false, Validators.requiredTrue)
  });

  getBookings() {
    this.bookingList = this.firebase.list('bookings');
    return this.bookingList.snapshotChanges();
  }

  addBooking(booking) {
    this.bookingList.push({
      date: Number(booking.date),
      startTime: booking.startTime,
      endTime: booking.endTime,
      firstName: booking.firstName,
      lastName: booking.lastName,
      place: booking.place,
      street: booking.street,
      houseNumber: booking.houseNumber,
      zipCode: booking.zipCode,
      email: booking.email,
      phone: booking.phone,
      persons: booking.persons,
      institution: booking.institution,
      personalData: booking.personalData
    });
  }

  editBooking(booking) {
    this.bookingList.update(booking.$key, {
      date: Number(booking.date),
      startTime: booking.startTime,
      endTime: booking.endTime,
      firstName: booking.firstName,
      lastName: booking.lastName,
      place: booking.place,
      street: booking.street,
      houseNumber: booking.houseNumber,
      zipCode: booking.zipCode,
      email: booking.email,
      phone: booking.phone,
      persons: booking.persons,
      institution: booking.institution,
      personalData: booking.personalData
    });
  }

  deleteBooking($key: string) {
    this.bookingList.remove($key);
  }

  initializeBookingForm() {
    this.email = this.authService.user.email;
    this.bookingForm.setValue({
      $key: null,
      date: '',
      startTime: '',
      endTime: '',
      firstName: '',
      lastName: '',
      place: '',
      street: '',
      houseNumber: '',
      zipCode: '',
      email: this.email,
      phone: '',
      persons: '',
      institution: '',
      personalData: false
    });
  }

  getFreeSlots() {
    const bookings = this.getBookings();
    const dateTimesBusy$ = bookings.pipe(
      map(bookings =>
        bookings
          .map(item => ({ ...item.payload.val() }))
          .filter(
            booking =>
              this.setTime(booking.startTime, new Date(booking.date)) >
              new Date()
          )
          .map(booking => ({
            date: new Date(booking.date),
            startTime: this.setTime(booking.startTime, new Date(booking.date)),
            endTime: this.setTime(booking.endTime, new Date(booking.date))
          }))
          .sort((a, b) => Number(a.startTime) - Number(b.startTime))
      ),
      map(slots => {
        const freeSlots = [];
        let lastTime = new Date();
        slots.forEach((slot, index) => {
          freeSlots.push({
            startTime: lastTime,
            endTime: slot.startTime
          });
          lastTime = slot.endTime;
        });
        freeSlots.push({
          startTime: lastTime,
          endTime: null
        });
        return freeSlots;
      })
    );
    return dateTimesBusy$;
  }

  setTime(time: string, date: Date) {
    if (time) {
      const timeParts = time.split(':');
      date.setHours(Number(timeParts[0]));
      date.setMinutes(0);
    }
    return date;
  }

  validStartTime(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.bookingForm) {
        const dateControl = this.bookingForm.get('date');
        const selectedDate = new Date(dateControl.value);
        this.setTime(control.value, selectedDate);
        const match = this.validTime(control.value) && this.freeSlots.some(slot => {
          const startTime = new Date(slot.startTime);
          const endTime = new Date(slot.endTime);
          return (
            selectedDate >= startTime &&
            (selectedDate < endTime || slot.endTime == null)
          );
        });
        return !match
          ? {
            invalid: {
              actual: control.value
            }
          }
          : null;
      }
      return null;
    };
  }

  validEndTime(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.bookingForm) {
        const selectedDate = new Date(this.bookingForm.get('date').value);
        const selectedStartDate = new Date(this.bookingForm.get('date').value);
        const selectedStartTime = this.bookingForm.get('startTime').value;
        this.setTime(control.value, selectedDate);
        this.setTime(selectedStartTime, selectedStartDate);
        const match = this.validTime(control.value) && this.freeSlots.some(slot => {
          const startTime = new Date(slot.startTime);
          const endTime = new Date(slot.endTime);
          return (
            selectedDate > startTime &&
            (selectedDate <= endTime || slot.endTime == null) &&
            Number(selectedDate) - Number(selectedStartDate) <= 7200000 &&
            selectedDate > selectedStartDate
          );
        });
        return !match
          ? {
            invalid: {
              actual: control.value
            }
          }
          : null;
      }
      return null;
    };
  }

  validTime(time: string) {
    if (time) {
      const [hours, minutes] = time.split(':');
      return Number(hours) >= 0 && Number(hours) < 24 && (minutes === undefined || Number(minutes) === 0);
    }
    return false;
  }
}
