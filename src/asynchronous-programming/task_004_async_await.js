/**
 * 4 Написать функцию в которой будет запрос URL_1,
 * из ответа получить поле getUserData
 * если значение getUserData - true, получить данные с URL_2 и вывести хи в консоль
 */

const URL_1 = 'http://www.json-generator.com/api/json/get/cfQCylRjuG';
const URL_2 = 'http://www.json-generator.com/api/json/get/cfVGucaXPC';

async function getUserData() {
  const response = await query(URL_1);

  if (response.getUsersData) {
    console.log(await query(URL_2));
  }
}

async function query(URL) {
  const response = await fetch(URL);
  return response.json();
}

// check
getUserData();

export { getUserData };
