const chai = require('chai')
const expect = chai.expect
const Booking = require('../lib/booking')

describe('Booking', () => {
  let startDate = new Date('2017-09-01')
  let endDate = new Date('2017-09-05')
  let authorisationDate = new Date('2018-01-01')
  let today = new Date()

  let booking = new Booking(startDate, endDate)

  it('initializes', () => {
    expect(booking.startDate).to.deep.equal(startDate)
    expect(booking.endDate).to.deep.equal(endDate)
  })

  it('calculates the number of days', () => {
    expect(booking.numberOfDays()).to.equal(5)
  })

  it('Knows if it is in the past', () => {
    expect(booking.isFuture()).to.equal(false)
  })

  it('Knows if it is in the future', () => {
    booking2 = new Booking(new Date('2120-01-01'), new Date('2120-01-01'))
    expect(booking2.isFuture()).to.equal(true)
  })

  it('is not authorized to begin with', () => {
    expect(booking.isAuthorized()).to.equal(false)
    expect(booking.authorizedBy()).to.equal(null)
    expect(booking.authorizedOn()).to.equal(null)
  })

  it('is can be authorized correctly for today', () => {
    booking.authorize('Mr Boss Man')
    expect(booking.isAuthorized()).to.equal(true)
    expect(booking.authorizedBy()).to.equal('Mr Boss Man')
    expect(booking.authorizedOn().getDate()).to.equal(today.getDate())
    expect(booking.authorizedOn().getMonth()).to.equal(today.getMonth())
    expect(booking.authorizedOn().getYear()).to.equal(today.getYear())
  })

  it('is can be authorized correctly for another date', () => {
    booking.authorize('Mr Boss Man', authorisationDate)
    expect(booking.isAuthorized()).to.equal(true)
    expect(booking.authorizedBy()).to.equal('Mr Boss Man')
    expect(booking.authorizedOn()).to.equal(authorisationDate)
  })
})
