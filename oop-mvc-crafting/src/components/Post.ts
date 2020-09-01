export default class Post {
  date: Date;

  constructor() {
    this.date = new Date();
  }

  toString() {
    return JSON.stringify({
      date: this.date.toJSON(),
    });
  }
}
