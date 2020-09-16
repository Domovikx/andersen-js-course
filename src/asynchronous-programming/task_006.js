/**
 * 6 Написать функцию getResolvedPromise
 * которая возвращает зарезолвленый промис со значением - value
 * Вызвать со значением value = 500
 * Если значение > 300 - бросить throw с текстом "Ошибка"
 * Поймать ошибку - catch, вывести в консоль текст ошибки
 * Ниже написать - finally, который выведет в консоль 'This is finally!'
 */

function getResolvedPromise(value) {
  return Promise.resolve(value);
}

function check(value) {
  getResolvedPromise(value)
    .then(value => {
      if (value > 300) {
        throw Error('Ошибка');
      }
    })
    .catch(error => {
      console.log(error, `value: ${value}`);
    })
    .finally(() => console.log('This is finally!'));
}

// check
check(500);
check(300);

export { getResolvedPromise, check };
