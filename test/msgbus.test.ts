import MsgBus from "../src/MsgBus"

test('MsgBus.BaseEventBus is instantiable', () => {
  expect(new MsgBus.BaseEventBus()).toBeInstanceOf(MsgBus.BaseEventBus)
})

describe('msgBus text', () => {
  const eventBus = new MsgBus.BaseEventBus()

  expect(eventBus).toBeInstanceOf(MsgBus.BaseEventBus)

  const testFun = (...args: any[]) => {
    console.log(args);
  }

  it('add listener test test2', () => {
    expect(eventBus.on('test', testFun)).toBe(eventBus)
    expect(eventBus.addListener('test2', testFun)).toBe(eventBus)
  })

  it('removeListener test2', () => {
    eventBus.removeListener('test2', testFun)
    expect(eventBus.listenerCount('test2')).toEqual(0);
  })

  it('current listeners is 1', () => {
    expect(MsgBus.BaseEventBus.listenerCount(eventBus, 'test')).toBe(1)
  })

  it('emit a message', () => {
    expect(eventBus.emit('test', '触发了 emit')).toBeTruthy()
  })

  it('default getMaxListeners is 10', () => {
    expect(eventBus.getMaxListeners()).toBe(10)
  })

  it('eventNames is ["test"]', () => {
    expect(eventBus.eventNames()).toEqual(['test'])
  })
})

