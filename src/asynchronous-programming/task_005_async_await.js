/**
 * 5 Написать функцию в которой получить данные по URLS
 * реализовать два варианте: параллельной и последовательной загрузки
 */

// helper function
async function query(URL) {
  try {
    const response = await fetch(URL);
    return response.json();
  } catch (error) {
    return { error: error.message.toString() };
  }
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

async function parallelLoading() {
  const results = await Promise.all(URLS.map(URL => query(URL)));
  console.log('parallelLoading() - results: ', results);
}
parallelLoading();

async function consistentLoading() {
  const results = [];
  await URLS.forEach(async URL => {
    const result = await query(URL);
    await results.push(result);
  });
  console.log('consistentLoading() - results: ', results);
}
consistentLoading();

export { parallelLoading, consistentLoading };
