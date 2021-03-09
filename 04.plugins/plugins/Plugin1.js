class Plugin1 {
  apply(complier) {
    complier.hooks.afterEmit.tap('Plugin1', (compilation) => {
      console.log('emit.tap')
    }) 

    complier.hooks.afterEmit.tap('Plugin1', (compilation) => {
      console.log('afterEmit.tap')
    }) 

    complier.hooks.afterEmit.tapAsync('Plugin1', (compilation, cb) => {
      setTimeout(() => {
        console.log('afterEmit.tapAsync')
        cb()
      }, 1000);
    }) 

    complier.hooks.afterEmit.tapPromise('Plugin1', (compilation) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('afterEmit.tapPromise')
          resolve()
        }, 1000);
      })
    }) 

    complier.hooks.done.tap('Plugin1', (stats) => {
      console.log('done.tap')
    }) 
  }
}

module.exports = Plugin1;