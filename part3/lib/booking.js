class Booking {
  constructor(startDate, endDate) {
    this.startDate = new Date(startDate)
    this.endDate = new Date(endDate)
    this._authorizedBy = null
    this._authorizedOn = null
  }

  authorize(authoriserName, authorizedOn = new Date()) {
    this._authorizedBy = authoriserName
    this._authorizedOn = authorizedOn
  }

  numberOfDays() {
    return (this.endDate - this.startDate) / 1000 / 60 / 60 / 24 + 1
  }

  isAuthorized() {
    return Boolean(this._authorizedBy)
  }

  authorizedBy() {
    return this._authorizedBy
  }

  authorizedOn() {
    return this._authorizedOn
  }

  isFuture() {
    // A booking is assumed to be in the future if its end date is in the future.
    return this.endDate > new Date()
  }
}

module.exports = Booking
