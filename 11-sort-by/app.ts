import sortBy from "sort-by";

interface User {
  id: number;
  name: string;
  age: string;
  email: {
    primary: string;
  };
}

let users: User[] = [
  {
    id: 7,
    name: "Foo",
    age: "34",
    email: { primary: "foo@email.com" },
  },
  {
    id: 3,
    name: "Baz",
    age: "67",
    email: { primary: "baz@email.com" },
  },
  {
    id: 4,
    name: "Bar",
    age: "67",
    email: { primary: "bar@email.com" },
  },
];

users.sort(sortBy<User>("name", "age"));

users.sort(sortBy<User>("-id", "name"));

users.sort(sortBy<User>("age", "email.primary"));

// test
console.log(users.sort(sortBy("name", "age")));
