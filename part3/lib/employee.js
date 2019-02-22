const Utils = require('./utils')
const Booking = require('./booking')

class Employee {
  constructor(payrollNo, name, email, holidayAllowance) {
    this.payrollNo = payrollNo
    this.name = Utils.capitalize(name)
    this.email = email
    this.holidayAllowance = holidayAllowance
    this._bookings = []
  }

  get bookings() {
    return this._bookings
  }

  set bookings(_) {
    throw 'Cannot overwrite Bookings array'
  }

  makeBooking(startDate, endDate) {
    const booking = new Booking(startDate, endDate)
    this._bookings.push(booking)
    return booking
  }

  daysBooked() {
    return this.bookings.reduce((count, booking) => {
      return count + booking.numberOfDays()
    }, 0)
  }

  daysRemaining() {
    return this.holidayAllowance - this.daysBooked()
  }

  daysBookedAndAuthorised() {
    return this.bookings
      .filter((booking) => booking.isAuthorized())
      .reduce((count, booking) => {
        return count + booking.numberOfDays()
      }, 0)
  }

  pastBookings(limitToAuthorized = false) {
    const bookings = this.bookings.filter((booking) => !booking.isFuture())
    if (limitToAuthorized) {
      return bookings.filter((booking) => booking.isAuthorized())
    }
    return bookings
  }

  futureBookings(limitToAuthorized = false) {
    const bookings = this.bookings.filter((booking) => booking.isFuture())
    if (limitToAuthorized) {
      return bookings.filter((booking) => booking.isAuthorized())
    }
    return bookings
  }
}

module.exports = Employee
