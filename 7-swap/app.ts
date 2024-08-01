const obj: Record<string, number> = {
  a: 1,
  b: 2
};

function swapKeysAndValues<K extends string, V extends number>(
  obj: Record<K, V>
): Record<V, K> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key])
  ) as Record<V, K>;
}

const res = swapKeysAndValues(obj);
console.log(res);
