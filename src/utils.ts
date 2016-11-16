/* tslint:disable:no-namespace */
import { when } from 'mobx';

export function omit<R, O extends R>(obj: O, ...keys: string[]): R {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && keys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  }
  return result as R;
}

export function typeCheck<T>(_: T) {
  // pass
}

export function delay(duration: number): Promise<{}> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

export function promisedWhen(condition: () => boolean): Promise<{}> {
  return new Promise(resolve => {
    when(condition, resolve);
  })
}
