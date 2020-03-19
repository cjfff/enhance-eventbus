import BaseEventBus, { eventData, Config } from './BaseEventBus'

type MessageConfig = Omit<Config, 'busType'>

const type = 'message'

export default class MessageEventBus extends BaseEventBus {
    constructor(config: MessageConfig) {
        
        super({ ...config, busType: type})

        window.addEventListener(type, this.handlerMethod.bind(this));
    }

    handleDataMethod(e: MessageEvent): eventData | void {

        // 没有传递信息
        if (!e.data) return;

        // 如果没有传递 data 字段
        if (typeof e.data !== 'object') return;

        // data 里没有传递 type (事件名称)
        if (!e.data.type) return;

        const { event: type, payload } = e.data;

        return {
            type,
            payload
        }
    }

    emit(type: string, ...args: any[]): boolean {

        // 如果没有父窗口
        if (!window.opener) return false;

        window.opener.postMessage({ type, payload: args }, window.location.origin);

        return true;
    }

}