/**
 * 5 Написать функцию в которой получить данные по URLS
 * реализовать два варианте: параллельной и последовательной загрузки
 */

// helper function
function query(URL) {
  const result = fetch(URL).then(
    response => response.json(),
    error => {
      return { error: error.message };
    }
  );
  return result;
}

const URLS = [
  'error',
  'http://www.json-generator.com/api/json/get/cevhxOsZnS',
  'http://www.json-generator.com/api/json/get/cguaPsRxAi',
  'http://www.json-generator.com/api/json/get/cfDZdmxnDm',
  'error',
  'http://www.json-generator.com/api/json/get/cfkrfOjrfS',
  'http://www.json-generator.com/api/json/get/ceQMMKpidK',
  'error',
];

function parallelLoading() {
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

function consistentLoading() {
  const results = [];
  URLS.forEach(URL => {
    query(URL).then(result => {
      results.push(result);
    });
  });
  console.log('>>> consistentLoading() - results: ', results);
}
consistentLoading();

export { parallelLoading, consistentLoading };
