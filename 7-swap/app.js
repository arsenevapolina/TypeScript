"use strict";
const obj = {
    a: 1,
    b: 2
};
function swapKeysAndValues(obj) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
}
const res = swapKeysAndValues(obj);
console.log(res);
