let repl = require('repl').start({
  useColors: true,
  terminal: true,
})
repl.context.Booking = require('./lib/booking')
repl.context.Employee = require('./lib/employee')
