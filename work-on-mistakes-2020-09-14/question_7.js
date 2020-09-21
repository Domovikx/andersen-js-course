async function getData() {
  console.log("object :>> 1"); // #1

  const response = await fetch(
    "https://www.json-generator.com/api/json/get/cevhxOsZnS"
  );
  const data = await response.json();
  console.log("data 1 :>> ", data); // #3 Object response
}

const data = getData();
data.then((val) => console.log("val :>> ", val)); // #4 undefined
console.log("data 2 :>> ", data); // #2 Promise

// ******************************

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
  .then((response) =>
    response.json("https://jsonplaceholder.typicode.com/todos/1")
  )
  .then((item) => item.id);
console.log("id :>> ", id);
// Promise {<pending>}

// 5.
setTimeout(() => console.log("setTimeout 1"), 1000);
Promise.resolve()
  .then(() => console.log("Promise :>> 1"))
  .then(() => console.log("Promise :>> 2"))
  .then(() => console.log("catch"));
setTimeout(() => console.log("setTimeout 2"), 0);
console.log("log :>>");
// log
// Promise :>> 1
// Promise :>> 2
// catch
// setTimeout 2
// setTimeout 1

// 6.
Promise.resolve("foo")
  .then(Promise.resolve("bar"))
  .then((res) => console.log("res: ", res)); // res:  foo

// 7.
const do_1 = () =>
  new Promise((resolve) => {
    console.log("do_1");
    setTimeout(() => resolve(10), 1000);
  });
const do_2 = () =>
  new Promise((resolve) => {
    console.log("do_2");
    setTimeout(() => resolve(20), 2000);
  });
const do_log = () => {
  console.log("val :>> ", val);
};

do_1()
  .then((val) => {
    console.log("val :>> ", val);
    do2;
  })
  .then(do_log);
// do_1
// val :>>  10

// 8
let id;
fetch()
  .then((response) =>
    response.json("https://jsonplaceholder.typicode.com/todos/1")
  )
  .then((item) => item.id);
console.log("id :>> ", id);
// id :>>  undefined

// 9
Promise.reject(10)
  .then((val) => console.log("val 1", val))
  .then((val) => console.log("val 2", val))
  .then((val) => console.log("val 3", val), (val) => 10 + 10)
  .then((val) => console.log("val 4", val))
  .catch((err) => console.log("err :>> ", err));
// val 4 20

// 10
setTimeout(() => console.log("setTimeout"), 0);
async function foo() {
  console.log("some");
  let data = await Promise.resolve(10);
  console.log(data);
}
foo();
console.log(20);
// some;
// 20;
// 10;
// setTimeout;
