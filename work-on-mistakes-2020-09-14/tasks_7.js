// 1
{
  console.log("x1 :>> ", x); // x1 :>>  undefined
  for (let i = 1; i <= 2; i++) {
    var x = 10 + i;
    let y = 20 + i;
  }
  console.log("x2 :>> ", x); // x2 :>>  12
  console.log("y :>> ", y); // ReferenceError: y is not defined
}

// 2
{
  const x = 0;
  const obj = { x: 10 };
  function foo() {
    const obj2 = { x: 20 };
    const f = () => console.log(this.x);
    f.x = 30;
    return f;
  }
  foo.x = 40;
  const bar = foo.call(obj, { x: 50 });
  bar.x = 60;
  bar({ x: 70 });
  bar.call({ x: 80 }, { x: 90 }, { x: 100 });
  // 10 10 undefined
}

// 3
{
  const x = ((x) => {
    x = 30;
  })(10);
  const y = x(); // x is not a function
  console.log("y :>> ", y);
}

// 4
// задача - дописать, setPersonAge чтобы работало
{
  const person = { age: 20 };
  function setAge(age) {
    this.age = age;
  }
  const setPersonAge = (age) => {
    person.age = new setAge(age).age;
  };
  setPersonAge(30);
  console.log("person :>> ", person);
}

// 5
{
  const x = 10;
  function foo(f) {
    const x = 20;
    const baz = f();
    baz();
  }
  foo(bar);
  function bar() {
    return () => {
      console.log("x :>> ", x); // 10
    };
  }
}

// 6
{
  function foo(f) {
    const x = 10;
    f.x = 20;
    return f.bind(this);
  }
  foo.x = 30;
  function bar() {
    console.log("x :>> ", x); // 50
  }
  foo.x = 40;
  const x = 50;
  const baz = foo(bar);
  bar.x = 60;
  baz();
}

// 7
// Как это логировать, не используя сравнения с чем-то ??? пока не нашел
// тут вопросы
{
  function foo() {}
  const x = 10;
  const y = Boolean(x);
  console.log("foo.__proto__ :>> ", foo.__proto__);
  console.log(
    "foo.__proto__.foo.__proto__.foo.__proto__ :>> ",
    foo.__proto__.foo.__proto__.foo.__proto__
  );
  console.log("x.__proto__ :>> ", x.__proto__);
  console.log("y.__proto__ :>> ", y.__proto__);
  console.log("Object.__proto__ :>> ", Object.__proto__);
}

// 8
// тут вопросы, в части объектов в консоли ???
{
  class Person {
    getName() {}
  }
  class Student extends Person {
    getAge() {}
  }
  const p = new Person();
  const s = new Student();
  console.log("Person.prototype :>> ", Person.prototype);
  // { constructor: class Person, getName: ƒ getName(), __proto__: Object}
  console.log("Student.prototype :>> ", Student.prototype);
  // Person { constructor: class Student, getAge: ƒ getAge(), __proto__: Object }
  console.log("p.__proto__) :>> ", p.__proto__);
  // { constructor: class Person, getName: ƒ getName(), __proto__: Object }
  console.log("s.prototype :>> ", s.prototype);
  // undefined
  console.log("s.__proto__ :>> ", s.__proto__);
  // Person {constructor: class Student, getAge: ƒ getAge(), __proto__: Object}
}

// 9
{
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    getName() {
      return this.name;
    }
  }
  // написать функцию newOp()
  function newOp(Person, name, age) {
    const obj1 = Object.create(Person.prototype).__proto__;
    console.log("obj1", obj1); // {constructor: ƒ, getName: ƒ, test: ƒ}
    const obj2 = { ...obj1, name, age };
    console.log("obj2", obj2); // {name: "Max", age: 20}
    // а как правильно ??????????
    return obj2;
  }
  const person = newOp(Person, "Max", 20);
  console.log("person :>> ", person); //
  console.log("person.getName() :>> ", person.getName()); //
}

// 10
{
  class Person {
    constructor(name) {
      this.name = name;
    }
    aboutMe(greetingWorld) {
      return `${greetingWorld} ${this.name}`;
    }
  }
  class Student extends Person {
    constructor(name, age) {
      super(name);
      this.age = age;
    }
    aboutMe(greetingWorld) {
      return `${super.aboutMe(greetingWorld)}. I am ${this.age}`;
    }
  }
  const max = new Student("Max", 20);
  const aboutMax = max.aboutMe("Hi! My name is");
  console.log("aboutMax :>> ", aboutMax);
  const sam = new Student("Sam", 33);
  const aboutSam = sam.aboutMe("Hello! I am");
  console.log("aboutSam :>> ", aboutSam);
}
