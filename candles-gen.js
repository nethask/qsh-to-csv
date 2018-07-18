var { A, F } = require('./readers/constants')
var { showFlags } = require('./readers/utils')

function candlesGenerator(filename, timeframe) {
  var i = 0
  let ordBook = {}
  return function(data, flags, operFlags) {
    i++
    const { price, volume } = data;
    const isAdd = (operFlags & F.Add) != 0;
    const isBuy = (operFlags & F.Buy) != 0;
    const isSell = (operFlags & F.Sell) != 0;
    if (operFlags & F.FlowStart) {
      ordBook = {}
    }

    if(!(isBuy ^ isSell) || operFlags & F.NonSystem || operFlags & F.NonZeroReplAct) {
      console.log('strange order:', showFlags(F, operFlags), showFlags(A, flags));
      return;
    }
    let quantity = ordBook[price] || 0
    if ((isAdd && isSell) || (!isAdd && isBuy)) {
       quantity += volume
    } else {
       quantity -= volume
    }
     
    if (quantity === 0) {
      delete ordBook[price]
    } else {
      ordBook[price] = quantity
    }

    if (i%10000 === 0) {
      console.log('i:',i, Object.keys(ordBook).length)
    }
  }
}

module.exports = candlesGenerator
