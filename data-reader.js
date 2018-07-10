const Bn = require('bn.js')

function FileReader(file) {
  this.file = file
  this.i = 0
}

FileReader.prototype.readLeb = function () {
  const num = new Bn(0)
  let shift = 0
  let cur_p = 0
  let byt
  while (true) {
    byt = this.file.readUInt8(this.i); this.i++;
    num.ior(new Bn(byt & 0x7f).shln(shift))
    shift += 7
    if (byt >> 7 === 0) {
      break
    }
  }
  // sign extend if negitive
  if (byt & 0x40) {
    num.setn(shift)
  }
  return num.fromTwos(shift)
}

FileReader.prototype.readULeb = function () {
  const num = new Bn(0)
  let shift = 0
  let byt
  while (true) {
    byt = this.file.readUInt8(this.i); this.i++;
    num.ior(new Bn(byt & 0x7f).shln(shift))
    if (byt >> 7 === 0) {
      break
    } else {
      shift += 7
    }
  }
  return num
}

const GROWING_NEXT = new Bn(268435455)
FileReader.prototype.readGrowing = function () {
  const value1 = this.readULeb()
  if (value1.cmp(GROWING_NEXT) === 0) {
    return +this.readLeb()
  }
  return +value1
}

FileReader.prototype.readConstStr = function (str) {
  const s = this.file.toString('utf-8', this.i, this.i+str.length);
  if(s !== str) { throw `invalid signature: ${s}, expected ${str}`; }
  this.i += str.length
}

FileReader.prototype.readStr = function () {
  const len = +this.readLeb();
  const s = this.file.toString('utf-8', this.i, this.i+len);
  this.i += len
  return s
}
FileReader.prototype.readDateTime = function () {
  const dt = this.file.readUIntLE(this.i, 8);
  this.i += 8
  return dt;
}
FileReader.prototype.readByte = function () {
  const res = this.file.readUInt8(this.i);
  this.i += 1
  return res
}
FileReader.prototype.readUInt16 = function () {
  const res = this.file.readUInt16LE(this.i);
  this.i += 2
  return res
}

FileReader.prototype.isEnd = function () {
  const { i, file } = this
  return i >= file.length
}

module.exports = FileReader
