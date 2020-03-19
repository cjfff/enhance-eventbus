import MessageEventBus from './lib/MessageEventBus'
import StorageEventBus from './lib/StorageEventBus'
import { Config } from './lib/BaseEventBus';

const map = {
    storage: StorageEvent,
    message: MessageEventBus
}

export default {
    MessageEventBus,
    StorageEventBus,
    install(Vue: any, config: Config) {
        if (!['storage', 'message'].includes(config.busType)) {
            throw new Error('type is not in storage , message');
        }
        Vue.prototype.$tabMessageBus = map[config.busType]
    }

}


