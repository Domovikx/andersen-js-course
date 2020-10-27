/**
 * 4 Написать функцию в которой будет запрос URL_1,
 * из ответа получить поле getUserData
 * если значение getUserData - true, получить данные с URL_2 и вывести хи в консоль
 */

const URL_1 = 'http://www.json-generator.com/api/json/get/cfQCylRjuG';
const URL_2 = 'http://www.json-generator.com/api/json/get/cfVGucaXPC';

function query(URL) {
  const promise = fetch(URL).then(response => response.json());
  return promise;
}

function getUserData() {
  query(URL_1).then(obj => {
    if (obj.getUsersData) {
      query(URL_2).then(res => {
        console.log('res :>> ', res);
      });
    }
  });
}

// check
getUserData();

export { getUserData };
