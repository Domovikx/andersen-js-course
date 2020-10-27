/**
 * Просто преобразовать содержимое функции task4Old под современный код
 *
 * Пример вызова
 * const obj = task4Old(); obj -> {x: 10, y: 20, bar: function, baztest: 'new field'}
 * obj.bar(); -> 30
 */

export function task4Old() {
  var x = 10;
  var y = 20;

  var obj = {
    x: x,
    y: y,
    bar: function bar() {
      return this.x + this.y;
    },
  };

  function foo() {
    return 'test';
  }

  obj['baz' + foo()] = 'new field';

  return obj;
}

const obj1 = task4Old();
console.log('obj1 :>> ', obj1);
console.log('obj1.bar() :>> ', obj1.bar());

// Напишите реализацию функции task4Old на ES6+ ниже этого комментария.
// При желании, можете использовать стрелочную функцию, вместо обычной

export const task4New = () => {
  const x = 10;
  const y = 20;
  const foo = () => 'test';

  const obj = {
    x,
    y,
    bar() {
      return this.x + this.y;
    },
    [`baz${foo()}`]: 'new field',
  };

  return obj;
};

const obj2 = task4New();
console.log('obj2 :>> ', obj2); // {x: 10, y: 20, bar: function, baztest: 'new field'}
console.log('obj2.bar() :>> ', obj2.bar()); // 30

export default task4New;
