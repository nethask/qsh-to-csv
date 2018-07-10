
const TypesMap = {
  0x10: 'Quotes',
  0x20: 'Deals',
  0x30: 'OwnOrders',
  0x40: 'OwnTrades',
  0x50: 'Messages',
  0x60: 'AuxInfo',
  0x70: 'OrdLog',
}

const A = {
  DateTime: 0x01,
  OrderId: 0x02,
  Price: 0x04,
  Volume: 0x08,
  RemainVolume: 0x10,
  IDFilled: 0x20,
  PriceFilled: 0x40,
  OpenInterest: 0x80,
}

const F = {
  NonZeroReplAct: 0x1 << 0,
  FlowStart: 0x1 << 1,
  Add: 0x1 << 2,
  Fill: 0x1 << 3,
  Buy: 0x1 << 4,
  Sell: 0x1 << 5,
  Snapshot: 0x1 << 6,
  Quote: 0x1 << 7,
  Counter: 0x1 << 8,
  NonSystem: 0x1 << 9,
  EndOfTransaction: 0x1 << 10,
  FillOrKill: 0x1 << 11,
  Moved: 0x1 << 12,
  Canceled: 0x1 << 13,
  CanceledGroup: 0x1 << 14,
  CrossTrade: 0x1 << 15,
}

module.exports = { TypesMap, A, F }
