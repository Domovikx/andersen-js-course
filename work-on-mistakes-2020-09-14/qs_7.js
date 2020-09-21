/* eslint-disable */

/**
 * 1. Что такое колбэк (функция обратного вызова)?
 * Какие проблемы существуют с КБ и в чем они заключаются, объяснить проблемы.
 */

/**
 * 2.
 * a) что такое промис?
 * b) Каким образом промис решает проблемы колбэков?
 * с) В каких состояниях может находиться промис?
 * d) Промис который перешел в другое состояние может перейти в другое состояние еще раз?
 * e) создайте промис который резолвится со значением 10 через 3 сек. распечатать результат в консоль
 */

/**
 * 3.
 * a) Promise.all() / race() / finally()
 * b) Что возвращает асинхронная функция
 * c) В чем профит async function
 * d) что такое main tread
 * e) в чем отличие concurency и paralellism
 */

// 4.
const id = fetch()
  .then(response => response.json('https://jsonplaceholder.typicode.com/todos/1'))
  .then(item => item.id);
// eslint-disable-next-line no-irregular-whitespace
console.log('id :>> ', id); // promise {<pending>}

// 5.
setTimeout(() => console.log('setTimeout 1'), 1000);
Promise.resolve()
  .then(() => console.log('Promise :>> 1'))
  .then(() => console.log('Promise :>> 2'))
  .then(() => console.log('catch'));
setTimeout(() => console.log('setTimeout 2'), 0);
console.log('log :>>');
// log
// Promise :>> 1
// Promise :>> 2
// catch
// setTimeout 2
// setTimeout 1
