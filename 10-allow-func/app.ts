function allowFunc(checkFunc: (value: number) => boolean) {
  return (target: Object, propertyKey: string) => {
    let value: number;

    const setter = function (newValue: number) {
      if (checkFunc(newValue)) {
        value = newValue;
      } else {
        console.error(
          `The value ${newValue} cannot be set, because the value must be greater than 0.`
        );
      }
    };

    const getter = function () {
      return value;
    };

    Object.defineProperty(target, propertyKey, {
      set: setter,
      get: getter,
    });
  };
}

class User {
  @allowFunc((a: number) => a > 0)
  age: number = 30;
}

const person = new User();
console.log(person.age);

person.age = 0;
console.log(person.age);

person.age = 20;
console.log(person.age);

person.age = -20;
console.log(person.age);
