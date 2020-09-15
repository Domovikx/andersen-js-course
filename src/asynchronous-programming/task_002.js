/**
 * 2.1 Реализуйте функцию parseJSON(jsonStr, successCb, failureCb).
 * jsonStr - строка JSON.
 * successCb - коллбек в случае успешного парсинга.
 * failureCb - коллбек в случае неуспешного парсинга (парсинга с ошибкой).
 * 2.2. Реализуйте функцию successCb(result). Функция принимает результат парсинга строки. Распечатывает в консоль строку Success parse! и после этого распечатывает результат (result).
 * 2.3. Реализуйте функцию failureCb(error). Функция принимает объект ошибки. Распечатывает в консоль строку 'Failure parse!' и после этого распечатывает ошибку (error).
 */

function parseJSON(jsonStr, success, failure) {
  try {
    success(JSON.parse(jsonStr));
  } catch (error) {
    failure(error);
  }
}

function successCb(result) {
  console.log('Success parse!');
  console.log(result);
}

function failureCb(error) {
  console.log('Failure parse!');
  console.log(error);
}

// check
parseJSON('{"x": 10}', successCb, failureCb); // Success parse! {"x": 10}'
parseJSON('{x}', successCb, failureCb); // Failure parse! error

export { parseJSON };
