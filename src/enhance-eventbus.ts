import StorageEventBus from './lib/StorageEventBus'
import BaseEventBus from './lib/BaseEventBus';

const map = {
  storage: StorageEventBus,
  base: BaseEventBus
}

type Config = {
  type: 'storage' | 'base',
  globalKey: string;
}

const defaultKey = '$eventBus'

export default {
  StorageEventBus,
  BaseEventBus,
  install(Vue: any, config: Config = { type: 'base', globalKey: defaultKey }) {
    if (!['storage', 'base'].includes(config.type)) {
      throw new Error('type is not in storage ');
    }
    Vue.prototype[config.globalKey || defaultKey] = map[config.type]
  }

}


