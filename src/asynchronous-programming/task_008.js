/**
 * 8 переписать функцию на async/await
 */

const URL_1 = 'https://jsonplaceholder.typicode.com/users';
const URL_2 = 'ht://jsonplaceholder.typicode.com/users';

const getUsers = URL => fetch(URL);

async function foo(URL) {
  try {
    const response = await getUsers(URL);
    const [user] = await response.json();
    console.log(user);
  } catch (error) {
    console.log('Error!', error);
  }
}

// check
foo(URL_1);
foo(URL_2);

export { foo };
