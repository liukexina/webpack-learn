import $ from 'jquery';
import { mul } from './test';

// eslint-disable-next-line
console.log(mul(1, 3));

// eslint-disable-next-line
console.log($)

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));
