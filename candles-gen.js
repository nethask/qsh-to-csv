var { A, F } = require('./readers/constants')

function candlesGenerator(filename, timeframe) {
  var i = 0
  return function(data, flags, operFlags) {
    i++
    if(i%100000 === 0) {
      console.log('i:',i)
    }
  }
}

module.exports = candlesGenerator
