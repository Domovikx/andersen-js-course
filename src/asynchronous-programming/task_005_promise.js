/**
 * 5 Написать функцию в которой получить данные по URLS
 * реализовать два варианте: параллельной и последовательной загрузки
 */

// ********** Параллельное **********

const URLS = [
  'error',
  'http://www.json-generator.com/api/json/get/cevhxOsZnS',
  'http://www.json-generator.com/api/json/get/cguaPsRxAi',
  'error',
  'http://www.json-generator.com/api/json/get/cfDZdmxnDm',
  'http://www.json-generator.com/api/json/get/cfkrfOjrfS',
  'http://www.json-generator.com/api/json/get/ceQMMKpidK',
  'error',
];

function parallelLoading() {
  function query(URL) {
    const result = fetch(URL).then(
      response => response.json(),
      error => {
        return { error: error.message };
      }
    );
    return result;
  }

  Promise.all(
    URLS.map(URL => {
      const result = query(URL);
      return result;
    })
  ).then(results => {
    console.log('>>> parallelLoading() - results: ', results);
  });
}
parallelLoading();

// ********** Последовательное **********

const URLS = [
  'error',
  'http://www.json-generator.com/api/json/get/cevhxOsZnS',
  'http://www.json-generator.com/api/json/get/cguaPsRxAi',
  'error',
  'http://www.json-generator.com/api/json/get/cfDZdmxnDm',
  'http://www.json-generator.com/api/json/get/cfkrfOjrfS',
  'http://www.json-generator.com/api/json/get/ceQMMKpidK',
  'error',
];

function consistentLoading() {
  function query(URL) {
    const result = fetch(URL).then(
      response => response.json(),
      error => {
        return { error: error.message };
      }
    );
    return result;
  }

  let arr = [];
  const promise = URLS.reduce((acc, url) => {
    return acc.then(arr => query(url).then(result => [...arr, result]));
  }, Promise.resolve(arr));

  promise.then(results => {
    console.log('>>> consistentLoading() - results: ', results);
  });
}
consistentLoading();

export { parallelLoading, consistentLoading };
