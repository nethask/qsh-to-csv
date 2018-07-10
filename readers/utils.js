const { F, A } = require('./constants')

function setData(data, name, value, not_growing=false) {
  data.fcount[name]++
  if(!data.fcount[name]) { data.fcount[name] = 1; }
  if(not_growing || data[name] === undefined) {
    data[name] = value
  }
  else {
    data[name] += value
  }
}

function showFlags(dict, flags) {
  const selected = []
  Object.keys(dict).forEach((flagName) => {
    if(flags & dict[flagName]) {
      selected.push(flagName)
    }
  })
  return selected.join(', ')
}

function showFlagsStat(data) {
  var namesMap = Array(16)
  Object.keys(F).forEach(n => namesMap[F[n]])
  console.log('==================== TOTAL:', data.records, 'PER SEC:', Math.round(data.records / 24 / 36)/100)
  console.log(data.fcount)
  console.log('====================')
  for(var i = 0; i < data.ffcount.length; i++) {
    for(var k in F) {
      if(F[k] & (1 << i)) { console.log(k+':', data.ffcount[i]) }
    }
  }
}

module.exports = { setData, showFlags, showFlagsStat }
