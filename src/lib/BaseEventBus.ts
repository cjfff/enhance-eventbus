export type Type = string

export type Listener = (...args: any[]) => void

type Subscribes = {
  [key: string]: Listener[];
}

export type eventData = {
  type: Type,
  payload: any
}

export default class BaseEventBus {
  // 订阅事件对象
  protected subscribes: Subscribes = {};

  private maxListeners: number;

  static defaultMaxListeners: number = 10;


  constructor() {

    this.maxListeners = BaseEventBus.defaultMaxListeners
  }

  static listenerCount(emitter: BaseEventBus, type: Type): number {
    // 如果传递了 type
    if (type) {
      return (emitter.subscribes[type] || []).length
    }

    return Object.values(emitter).reduce((count: number, value: Listener) => value.length + count, 0)
  };

  eventNames(): Array<Type> {
    return Object.keys(this.subscribes)
  }

  setMaxListeners(n: number): this {
    if (n > 0) {
      this.maxListeners = n;
    }
    return this
  }

  getMaxListeners(): number {
    return this.maxListeners
  }

  emit(type: Type, ...args: any[]): boolean {
    (this.subscribes[type] || []).forEach((fun) => {
      fun && fun(...args)
    })
    return true;
  };

  addListener(type: Type, listener: Listener): this {

    this.subscribes[type] = (this.subscribes[type] || [])

    this.subscribes[type].push(listener)

    return this
  };

  on(type: Type, listener: Listener): this {
    return this.addListener(type, listener)
  };

  once(type: Type, listener: Listener): this {

    const fun: Listener = (...args: any[]) => {
      listener && listener(...args)
      this.off(type, fun)
    }

    return this.on(type, fun)
  };
  // prependOnceListener(type: Type, listener: Listener): this;
  // prependListener(type: Type, listener: Listener): this;

  removeListener(type: Type, listener: Listener): this {
    (this.subscribes[type] || []).forEach((value: Listener, index: number) => {

      if (value === listener) {
        this.subscribes[type].splice(index, 1);

        !this.subscribes[type].length && (delete this.subscribes[type])
      }
    })

    return this;
  }

  off(type: Type, listener: Listener): this {
    return this.removeListener(type, listener)
  }

  removeAllListeners(type?: Type): this {
    if (type) {
      delete this.subscribes[type]
    } else {
      this.subscribes = {}
    }
    return this
  }

  listeners(type: Type): Listener[] {
    return this.subscribes[type]
  }

  listenerCount(type: Type): number {
    return (this.subscribes[type] || []).length
  }
}
