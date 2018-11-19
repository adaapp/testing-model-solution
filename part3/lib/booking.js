class Booking {
  constructor(startDate, endDate) {
    this.startDate = startDate
    this.endDate = endDate
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
}

module.exports = Booking
