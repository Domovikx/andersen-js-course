/**
 * Реализовать функцию createGenerator в этом файле, и экспортировать ее.
 *
 * При каждом вызове метода .next() происходит возврат следующего значения из массива
 * Когда все элементы будут возвращены,
 * следующие вызовы метода .next() должны возвращать строку 'Complete!'
 *
 * В решении функции-генераторы (function*) не использовать.
 *
 * const generator = createGenerator([1, '6', 3, 2]);
 * generator.next(); -> 1
 * generator.next(); -> '6'
 * generator.next(); -> 3
 * generator.next(); -> 2
 * generator.next(); -> 'Complete!'
 * generator.next(); -> 'Complete!'
 */

export function createGenerator(arr) {
  const arrCopy = [...arr];

  return {
    next() {
      if (!arrCopy[0]) {
        return 'Complete!';
      }
      return arrCopy.shift();
    },
  };
}

const arr = [1, '6', 3, 2];
const generator = createGenerator(arr);
console.log('generator :>> ', generator);

console.log('generator.next(); :>> ', generator.next());
console.log('generator.next(); :>> ', generator.next());
console.log('generator.next(); :>> ', generator.next());
console.log('generator.next(); :>> ', generator.next());

console.log('generator.next(); :>> ', generator.next());
console.log('generator.next(); :>> ', generator.next());

console.log('arr :>> ', arr);

export default createGenerator;
