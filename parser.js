var fs = require('fs')
var Readers = require('./readers')
var { TypesMap } = require('./readers/constants')
var { showFlagsStat } = require('./readers/utils')
var FileReader = require('./data-reader')

function readHeader(file) {
  file.readConstStr('QScalp History Data')
  const version = file.readByte();
  if(version !== 4) { throw `cannot handle this version: ${version}`; }
  const program = file.readStr()
  const comment = file.readStr()
  const datetime = file.readDateTime()
  const streams = file.readByte()
  return [program, comment, datetime, streams]
}

function readStreamHeader(file) {
  const streamId = file.readByte()
  const streamName = file.readStr()
  return [TypesMap[streamId], streamName]
}

function readFrameHeader(file, streams) {
  const date = file.readGrowing()
  if (streams <= 1) { return [date, 0] }
  const streamNum = file.readByte()
  return [date, streamNum]
}

function parseFile() {
  var buf = fs.readFileSync('data/GOLD.qsh')
  const file = new FileReader(buf)
  const data = {}
  const [program, comment, datetime, streams] = readHeader(file);
  
  console.log('program:', program)
  console.log('comment:', comment)
  console.log('dattime:', datetime)
  console.log('streams:', streams)
  data.ts = datetime
  streamsData = Array(streams).fill(0).map(() => readStreamHeader(file))
  console.log(streamsData)
  
  streamsData.forEach(([streamType, streamName]) => {
     const frameHeader = readFrameHeader(file, streams);
     console.log(frameHeader);
     console.log(streamType)
     const dataProcessor = Readers[streamType];
     dataProcessor(file, data);
     showFlagsStat(data)
  })
  
}

parseFile();
