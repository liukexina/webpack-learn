import '../css/index.less';
import { mul } from './test';

console.log(mul(1, 3));

function add(x, y) {
  return x + y;
}

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sum(1, 2, 3, 4, 5));

// eslint-disable-next-line
console.log(add(1, 6));
