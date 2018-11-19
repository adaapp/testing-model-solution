const chai = require('chai')
const expect = chai.expect
const Employee = require('../lib/employee')

describe('Employee', () => {
  it('should initialize properly', () => {
    let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 25)

    expect(employee.payrollNo).to.equal('E123')
    expect(employee.name).to.equal('Joe Bloggs')
    expect(employee.email).to.equal('joe@bloggs.com')
    expect(employee.bookings).to.deep.equal([])
    expect(employee.holidayAllowance).to.equal(25)
  })

  it('should throw an error when bookings is overwritten', () => {
    let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 25)
    expect(() => {
      employee.bookings = 'nonsense'
    }).to.throw('Cannot overwrite Bookings array')
  })

  describe('When no days have been booked', () => {
    let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 25)

    it('Calculates days remaining', () => {
      expect(employee.daysRemaining()).to.equal(25)
    })
    it('Calculates days booked', () => {
      expect(employee.daysBooked()).to.equal(0)
    })
    it('Calculates days bookedAndauthorised', () => {
      expect(employee.daysBookedAndAuthorised()).to.equal(0)
    })
  })

  it('Can make a booking', () => {
    let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 25)

    let booking = employee.makeBooking('2020-09-01', '2020-09-05')

    expect(booking).to.be.a('object')
    // TODO: Add some more tests here.
  })

  it('Can get past bookings', () => {
    let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 25)
    employee.makeBooking('2120-09-01', '2120-09-05')
    employee.makeBooking('1920-09-01', '1920-09-05')

    let pb = employee.pastBookings()
    expect(pb.length).to.equal(1)
    expect(pb[0].startDate).to.deep.equal(new Date('1920-09-01'))
  })

  it('Can get past bookings (only authorized)', () => {
    let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 25)
    employee.makeBooking('2120-09-01', '2120-09-05')
    employee.makeBooking('1920-09-01', '1920-09-05')
    employee.makeBooking('1920-10-01', '1920-10-05')
    employee.bookings[1].authorize('Mr Boss Man')

    let pb = employee.pastBookings(true)
    expect(pb.length).to.equal(1)
    expect(pb[0].startDate).to.deep.equal(new Date('1920-09-01'))
  })

  it('Can get future bookings', () => {
    let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 25)
    employee.makeBooking('2120-09-01', '2120-09-05')
    employee.makeBooking('1920-09-01', '1920-09-05')

    let fb = employee.futureBookings()
    expect(fb.length).to.equal(1)
    expect(fb[0].startDate).to.deep.equal(new Date('2120-09-01'))
  })

  it('Can get future bookings (only authorized)', () => {
    let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 25)
    employee.makeBooking('1920-09-01', '1920-09-05')
    employee.makeBooking('2120-09-01', '2120-09-05')
    employee.makeBooking('2120-10-01', '2120-10-05')
    employee.bookings[1].authorize('Mr Boss Man')

    let pb = employee.futureBookings(true)
    expect(pb.length).to.equal(1)
    expect(pb[0].startDate).to.deep.equal(new Date('2120-09-01'))
  })

  describe('When days have been booked but not authorized', () => {
    let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 25)
    employee.makeBooking('2020-09-01', '2020-09-05') // 5 Days
    employee.makeBooking('2015-09-01', '2015-09-05') // 5 Days

    it('Calculates days remaining', () => {
      expect(employee.daysRemaining()).to.equal(15)
    })
    it('Calculates days booked', () => {
      expect(employee.daysBooked()).to.equal(10)
    })
    it('Calculates days bookedAndauthorised', () => {
      expect(employee.daysBookedAndAuthorised()).to.equal(0)
    })
  })

  describe('When days have been booked and authorized', () => {
    describe('With 25 days leave', () => {
      let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 25)
      employee.makeBooking('2020-09-01', '2020-09-05') // 5 Days - future
      employee.makeBooking('2015-09-01', '2015-09-05') // 5 Days - past

      // Authorize the secnd Booking
      employee.bookings[1].authorize('Mr Boss Man')

      it('Calculates days remaining', () => {
        expect(employee.daysRemaining()).to.equal(15)
      })
      it('Calculates days booked', () => {
        expect(employee.daysBooked()).to.equal(10)
      })
      it('Calculates days bookedAndauthorised', () => {
        expect(employee.daysBookedAndAuthorised()).to.equal(5)
      })
    })

    describe('With 15 days leave', () => {
      let employee = new Employee('E123', 'Joe Bloggs', 'joe@bloggs.com', 15)
      employee.makeBooking('2020-09-01', '2020-09-05') // 5 Days - future
      employee.makeBooking('2015-09-01', '2015-09-03') // 3 Days - past

      // Authorize the secnd Booking
      employee.bookings[1].authorize('Mr Boss Man')

      it('Calculates days remaining', () => {
        expect(employee.daysRemaining()).to.equal(7)
      })
      it('Calculates days booked', () => {
        expect(employee.daysBooked()).to.equal(8)
      })
      it('Calculates days bookedAndauthorised', () => {
        expect(employee.daysBookedAndAuthorised()).to.equal(3)
      })
    })
  })
})
