
function readAuxInfo(file) {
  const flags = file.readByte()
  console.log('flags:', flags.toString(2))
}

module.exports = readAuxInfo
