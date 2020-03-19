# tabEventBus



## example

```js
// yarn add tabeventbus or npm i -S tabeventbus

const eventBus = new tabeventbus.StorageEventBus({
  isDev: () => true
})

eventBus.on('someEvent', ([data]) => {

  console.log(data)
})

eventBus.emit('someEvent', {msg: 'hello world'})

```
