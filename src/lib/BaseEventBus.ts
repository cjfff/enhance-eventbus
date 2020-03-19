export type Type = string

export type Listener = (...args: any[]) => void

type Subscribes = {
    [key: string]: Listener[];
}

type BusType = 'storage' | 'message'

export type Config = {
    originWhiteList?: string[],
    isDev?: (...args: any[]) => boolean,
    busType: BusType
}

export type eventData = {
    type: Type,
    payload: any
}

export default abstract class BaseEventBus {
    // 订阅事件对象
    protected subscribes: Subscribes = {};

    // 判断是否开发环境
    public isDev: (...args: any[]) => boolean;

    public originWhiteList: string[] = []

    private maxListeners: number;

    // 初始化成什么事件类型
    protected busType: Type;

    static defaultMaxListeners: number = 10;


    constructor({ originWhiteList, isDev, busType = 'message' }: Config) {

        this.maxListeners = BaseEventBus.defaultMaxListeners

        this.originWhiteList = originWhiteList || []; // 白名单

        this.isDev = isDev || (() => false);

        this.busType = busType;

    }

    private validateOrigin() {
        // 开发环境不校验
        if (this.isDev && this.isDev()) {
            console.log(`tabEventBus 开发环境不校验域名白名单`)
            return true;
        }

        const isWhiteOrigin = this.originWhiteList.some(v => v.includes(window.origin))

        if (!isWhiteOrigin) {
            console.error(`${window.origin} is not in the whiteOirignList`)
        }

        return isWhiteOrigin;
    }


    abstract handleDataMethod(e: any): eventData | void;

    protected handlerMethod(e: any) {
        // 校验域名白名单
        if (!this.validateOrigin()) return;

        const data = this.handleDataMethod(e);

        // 没有传递信息
        if (!data) return;


        const { type, payload } = data;


        (this.subscribes[type] || []).forEach(cb => {
            cb && cb(payload);
        });
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

    abstract emit(type: Type, ...args: any[]): boolean;

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
