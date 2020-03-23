# enhance-eventbus

以简单的 api，类似于 vue 的 `Eventbus` 一样的使用方式，实现 跨浏览器 tab 之间，以及 iframe 与 global 之间的通信。

## example

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
