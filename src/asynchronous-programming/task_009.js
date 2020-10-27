/**
 * 9 Написать реализацию асинхронной функции foo().
 * Внутри получить значение ('Some string!') из функции asyncBar
 * распечатать полученное значение в консоль
 */

const asyncBar = async () => 'Some string';

async function foo() {
  const response = await asyncBar();
  console.log(response);
}

// check
foo();

export { foo };
