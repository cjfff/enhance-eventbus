import BaseEventBus, { eventData, Config, Type, Listener } from './BaseEventBus'

type StorageConfig = Omit<Config, 'busType'>

const type = 'storage'

export default class StorageEventBus extends BaseEventBus {
  constructor(config: StorageConfig) {
    super({ ...config, busType: type })

    window.addEventListener(type, this.handlerMethod.bind(this));
  }

  handleDataMethod(e: any): eventData | void {
    const { key: type, newValue } = e as StorageEvent;

    if (!type) return

    // localStorage 没字段，或者没订阅就直接返回
    if (!localStorage.getItem(type) || !this.subscribes[type]) return;

    // 删除也会触发
    if (!newValue) return;

    let payload = null;

    try {
      payload = JSON.parse(newValue);
    } catch (error) {
      throw error
    }

    return {
      type,
      payload
    };
  }

  addListener(type: Type, listener: Listener): this {
    this.subscribes[type] = (this.subscribes[type] || [])

    this.subscribes[type].push(listener)
    localStorage.setItem(type, 'init');

    return this
  };


  emit(type: string, ...args: any[]): boolean {

    const data = args ? JSON.stringify(args) : `${Math.random()}`

    localStorage.setItem(type, data);

    return true;
  }

}
