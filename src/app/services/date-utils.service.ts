import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  todaysDate: Date;
  tomorrowsDate: Date;
  todayMidnight;
  tomorrowMidnight;

  constructor() {
    this.setToday();
    this.setTomorrow();
    this.setMidnight();
    this.setTomorrowMidnight();
  }

  setToday() {
    this.todaysDate = new Date();
  }

  setTomorrow() {
    this.tomorrowsDate = new Date(this.today);
    this.tomorrowsDate.setDate(this.tomorrowsDate.getDate() + 1);
  }

  setMidnight() {
    let today = this.today;
    this.todayMidnight = today.setHours(0, 0, 0, 0);
  }

  setTomorrowMidnight() {
    this.tomorrowMidnight = this.tomorrowsDate;
    this.tomorrowMidnight = this.tomorrowsDate.setHours(0, 0, 0, 0);
  }

  get today() {
    return this.todaysDate;
  }

  get tomorrow() {
    return this.tomorrowsDate;
  }

  get midnightToday() {
    return this.todayMidnight;
  }

  get midnightTomorrow() {
    return this.tomorrowMidnight;
  }

}
