/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
// https://github.com/TanStack/query/blob/main/packages/query-core/src/utils.ts
export function isPlainArray(value: unknown) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}

export function isPlainObject(o: any): o is object {
  if (!hasObjectPrototype(o)) return false;
  const ctor = o.constructor;
  if (ctor === undefined) return true;
  const prot = ctor.prototype;
  if (!prot || !prot.hasOwnProperty('isPrototypeOf')) return false;
  if (Object.getPrototypeOf(o) !== Object.prototype) return false;
  return true;
}

function hasObjectPrototype(o: any): boolean {
  return Object.prototype.toString.call(o) === '[object Object]';
}

export function replaceEqualDeep(a: any, b: any): any {
  if (a === b) return a;
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || (isPlainObject(a) && isPlainObject(b))) {
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy: any = array ? [] : {};
    const aItemsSet = new Set(aItems);
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      if (
        ((!array && aItemsSet.has(key)) || array) &&
        a[key] === undefined &&
        b[key] === undefined
      ) {
        copy[key] = undefined;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(a[key], b[key]);
        if (copy[key] === a[key] && a[key] !== undefined) {
          equalItems++;
        }
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
