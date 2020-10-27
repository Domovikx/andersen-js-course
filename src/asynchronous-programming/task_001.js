/**
 * 1. Реализуйте функцию foo(x, cb). х - числовое значение, cb - коллбек-функция.
 * Если х > 10, то в консоль выводим строку 'х > 10' и вызываем коллбек.
 * Если х <= 10, то в консоль выводим строку 'х <= 10', и коллбек НЕ вызываем.
 * Реализуйте функцию createCb(srt). Функция createCb создает функцию, которая пишет в консоль то, что было передано при вызове функции createCb в параметре str.
 * Примеры вызовов функции foo
 * foo(5, createCb(1cb1));
 * В консоль вывелось следующее // 'х <= 10'
 * foo(20, createCb('cb'));
 * В консоль вывелось следующее // 'х > 10' 'cb'
 */

function foo(x, callback) {
  if (x > 10) {
    console.log('x > 10');
    callback();
  } else {
    console.log('x <= 10');
  }
}

function createCb(str) {
  return () => console.log(str);
}

// check
foo(5, createCb('cb'));
foo(20, createCb('cb'));

export { foo };
