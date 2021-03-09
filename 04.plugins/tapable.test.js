const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");



class Lession {
  constructor() {
    // 初始化hooks容器
    this.hooks = {
      // 同步hooks 任务回调依次执行
      // go: new SyncHook(['address'])
      // SyncBailHook: 一旦有返回值return就会退出～
      go: new SyncBailHook(['address']),

      // 异步hooks
      // AsyncParallelHook: 异步并行
      // leave: new AsyncParallelHook(['name', 'age'])
      // AsyncSeriesHook: 同步执行
      leave: new AsyncSeriesHook(['name', 'age'])
    }
  }
  tap() {
    // 往hooks容器里注册事件/添加回调函数
    this.hooks.go.tap('class1', (address) => {
      console.log('class1 ' + address)
      return 111;
    })

    this.hooks.go.tap('class2', (address) => {
      console.log('class2 ' + address)
    })

    this.hooks.leave.tapAsync('class3', (name, age, callback) => {
      setTimeout(() => {
        console.log('class3', name, age)
        callback();
      }, 2000);
    })

    this.hooks.leave.tapPromise('class4', (name, age) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('class4',name,age)
          resolve();
        }, 1000);
      })
    })
  }
  start(address) {
    // 触发hooks
    this.hooks.go.call(address)

    this.hooks.leave.callAsync('lkx', 20, () => {
      // 代表所有leave容器中的函数执行完毕～
      console.log('end~')
    });
  }
}

const l = new Lession();
l.tap();
l.start('地址')