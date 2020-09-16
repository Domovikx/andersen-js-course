/**
 * 3 Реализуйте функцию delay(ms), которая возвращает промис, переходящий в состояние resolved через ms миллисекунд и который несет значение 100.
 */

function delay(ms) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(100), ms);
  });

  return promise;
}

// check
delay(1000).then(value => console.log(`Done with ${value}`)); // Done with 100

export { delay };
