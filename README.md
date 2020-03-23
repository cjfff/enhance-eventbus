# enhance-eventbus

[![NPM Download](https://badgen.net/npm/dm/enhance-eventbus)](https://www.npmjs.com/package/enhance-eventbus)
[![NPM Version](https://badgen.net/npm/v/enhance-eventbus)](https://www.npmjs.com/package/enhance-eventbus)
[![NPM License](https://badgen.net/npm/license/enhance-eventbus)](https://github.com/cjfff/enhance-eventbus/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/cjfff/enhance-eventbus/pulls)
[![typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://badgen.net/badge/icon/typescript?icon=typescript&label)
[![package size](https://badgen.net/bundlephobia/minzip/enhance-eventbus)](https://badgen.net/bundlephobia/minzip/enhance-eventbus)


## 介绍

`eventBus` 是一个典型的发布订阅模式的实践，而这个包的基础功能就是发布订阅。

[`eventBus`](http://nodejs.cn/api/events.html) 在 `node.js` 中本就自带，所以为什么需要写这个包呢？

其实从包名 `enhance-eventbus` 中也可以看出来，这是一个增强 (其实是不会起名字) 的 `eventBus`。

它比普通的 `eventBus` 多了可以在浏览器跨 `tab` (有同源限制)。

它的 `api` 跟普通的 `eventBus` 是一样的使用方式的，极其简单, 相信使用过 `vue` 里面 `eventBus`（ `new` 一个 `vue` 实例作为`eventBus`）的小伙伴们, 都知道怎么使用～

## example

![example](https://github.com/cjfff/enhance-eventbus/raw/master/screenshot/example.gif)


```js
// yarn add enhance-eventbus or npm i -S enhance-eventbus

const eventBus = new tabeventbus.StorageEventBus({
  isDev: () => true
})

eventBus.on('someEvent', ([data]) => {

  console.log(data)
})

eventBus.emit('someEvent', {msg: 'hello world'})
```


## 感谢以下项目（排名不分先后）
* [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter) 库的依赖有点老旧，升级下就能用了
* [typescript](https://github.com/microsoft/TypeScript)
