/* tslint:disable:no-namespace */

export function omit<R, O extends R>(obj: O, ...keys: string[]): R {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && keys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  }
  return result as R;
}

declare namespace Object {
  function assign(...args: any[]): any;
}

export function assign<P, V extends P>(value: V, part: P): V {
  return Object.assign({}, value, part);
}

export function merge<A, B>(a: A, b: B): A & B {
  return Object.assign({}, a, b);
}

export function typeCheck<T>(_: T) {
  // pass
}

export function onChange(
  handler: (value: string) => void,
  format?: (value: string) => string,
  forceUpdate?: () => void
) {
  function handle(e: Event) {
    const input = e.target as HTMLInputElement;
    let value = input.value || '';
    if (format) {
      value = format(value);
    }
    handler(value);
    if (forceUpdate) {
      forceUpdate();
    }
  }

  return { onChange: handle, onInput: handle };
}
