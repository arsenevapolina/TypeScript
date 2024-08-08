const user = {
  name: "Vasiliy",
  age: 8,
  skills: ["typescript", "javascript"],
};

function pickObjectKeys<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Record<K, T[K]> {
  const result: Record<string, any> = {};

  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });

  return result as Record<K, T[K]>;
}

const res = pickObjectKeys(user, ["age", "skills"]);

console.log(res);
