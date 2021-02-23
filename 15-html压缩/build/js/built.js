/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
eval("// import '@babel/polyfill'\nconst add = (x, y) => x + y;\n\nconst promise = new Promise((resovle) => {\n  setTimeout(() => {\n    console.log('ok');\n    resovle();\n  }, 1000);\n});\nconsole.log(promise);\n// eslint-disable-next-line\nconsole.log(add(1, 2));\n\n\n//# sourceURL=webpack:///./src/js/index.js?");
/******/ })()
;