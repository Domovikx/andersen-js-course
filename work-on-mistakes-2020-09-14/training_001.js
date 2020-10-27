/* eslint-disable no-console */
async function getData() {
  console.log('object :>> 1'); // #1

  const response = await fetch('https://www.json-generator.com/api/json/get/cevhxOsZnS');
  const data = await response.json();
  console.log('data 1 :>> ', data); // #3 Object response
}

const data = getData();
data.then(val => console.log('val :>> ', val)); // #4 undefined
console.log('data 2 :>> ', data); // #2 Promise

// ******************************
