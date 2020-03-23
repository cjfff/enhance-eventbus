import StorageEventBus from './lib/StorageEventBus'
import BaseEventBus from './lib/BaseEventBus';

const map = {
  storage: StorageEventBus,
  base: BaseEventBus
}

type Config = {
  type: 'storage' | 'base'
}

export default {
  StorageEventBus,
  BaseEventBus,
  install(Vue: any, config: Config = { type: 'base' }) {
    if (!['storage', 'base'].includes(config.type)) {
      throw new Error('type is not in storage ');
    }
    Vue.prototype.$msgBus = map[config.type]
  }

}


