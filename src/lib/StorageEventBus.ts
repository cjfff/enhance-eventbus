import BaseEventBus, { eventData, Type, Listener } from './BaseEventBus'

export default class StorageEventBus extends BaseEventBus {

  constructor() {
    super()

    window.addEventListener('storage', this.handlerMethod.bind(this));
  }

  private handlerMethod(e: StorageEvent) {

    const data = this.handleDataMethod(e);

    // 没有传递信息
    if (!data) return;

    const { type, payload } = data;

    (this.subscribes[type] || []).forEach(cb => {
      cb && cb(...payload);
    });
  }

  handleDataMethod(e: StorageEvent): eventData | void {
    const { key: type, newValue } = e;

    if (!type) return

    // localStorage 没字段，或者没订阅就直接返回
    if (!localStorage.getItem(type) || !this.subscribes[type]) return;

    // 删除也会触发
    if (!newValue) return;

    let payload = null;

    try {
      payload = JSON.parse(newValue);
    } catch (error) {
      payload = null;
      console.error(error)
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

    // 重新了 addListener 方法，因为这里需要初始化检测函数
    localStorage.setItem(type, 'init');

    return this
  };


  emit(type: Type, ...args: any[]): boolean {

    let data = null;

    // 可能传输的数据会有问题，这里进行一下错误捕捉
    try {
      data = JSON.stringify(args);
    } catch (error) {
      data = JSON.stringify(error)
      console.error(error)
    }

    localStorage.setItem(type, data);

    return true;
  }

}
