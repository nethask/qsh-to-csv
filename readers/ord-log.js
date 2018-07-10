var { A, F } = require('./constants')
var { setData } = require('./utils')

function readOrdLogStep(file, data, stepCallback) {
  let flags = file.readByte()
  let operFlags = file.readUInt16()
  for(var i = 0; i < 16; i++) { if(operFlags & 1 << i) data.ffcount[i]++ }
  // console.log(flags.toString(16), showFlags(A, flags))
  // console.log(operFlags.toString(16), showFlags(F, operFlags))
  if (A.DateTime & flags) { setData(data, 'date', file.readGrowing());  }
  if (A.OrderId & flags) {
    if (operFlags & F.Add) { setData(data, 'id', file.readGrowing()) }
    else                   { setData(data, 'id', +file.readLeb()) }
  }
  if (A.Price & flags) { setData(data, 'price', +file.readLeb()); }
  if (A.Volume & flags) { setData(data, 'volume', +file.readLeb(), true) }
  if (operFlags & F.Fill) {
    if (A.RemainVolume & flags) { setData(data, 'rem_vol', +file.readLeb(), true) }
    if (A.IDFilled & flags) { setData(data, 'id_filled', file.readGrowing()) }
    if (A.PriceFilled & flags) { setData(data, 'price_filled', +file.readLeb()) }
    if (A.OpenInterest & flags) { setData(data, 'open_interest', +file.readLeb()) }
  }
  stepCallback(data, flags, operFlags)
}

function readOrdLog(file, data, stepCallback) {
  data.fcount = {}
  data.ffcount = Array(16).fill(0)
  data.records = 0
  while(true) {
    readOrdLogStep(file, data, stepCallback)
    data.records++
    if (file.isEnd()) {
      break;
    }
    data.ts += file.readGrowing()
    //console.log('price', data.price, 'volume', data.volume)
  }
}

module.exports = readOrdLog
