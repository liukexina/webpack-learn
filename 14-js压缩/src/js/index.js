// import '@babel/polyfill'
const add = (x, y) => x + y;

const promise = new Promise((resovle) => {
  setTimeout(() => {
    console.log('ok');
    resovle();
  }, 1000);
});
console.log(promise);
// eslint-disable-next-line
console.log(add(1, 2));
