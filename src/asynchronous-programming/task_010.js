/**
 * 10 Реализовать класс Musician
 * В конструкторе принимает URL - albumsURL
 * реализовать асинхронный метод - getAlbums,
 * чтобы получить альбомы из - albumsURL
 * распечатать массив значений в консоль
 */
const URL = 'https://jsonplaceholder.typicode.com/albums';

class Musician {
  constructor(URL) {
    this.albumsURL = URL;
  }

  async getAlbums() {
    const response = await fetch(this.albumsURL);
    const result = await response.json();
    console.log('result', result);
    return result;
  }
}

// check
const musician = new Musician(URL);
musician.getAlbums();

export { Musician };
