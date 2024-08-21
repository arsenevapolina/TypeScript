interface A {
  a: number;
  b: string;
}

interface B {
  a: number;
  c: boolean;
}

type DifferenceKeys<T, Y> = Exclude<keyof T, keyof Y>;

function difference<T extends object, Y extends object>(
  objA: T,
  objB: Y
): Pick<T, DifferenceKeys<T, Y>> {
  const result = {} as Pick<T, DifferenceKeys<T, Y>>;

  for (const key in objA) {
    if (key in objB) {
      continue;
    }
    result[key as keyof T] = objA[key];
  }

  return result;
}

let a: A = { a: 5, b: "" };
let b: B = { a: 10, c: true };

const result = difference(a, b);
console.log(result);
