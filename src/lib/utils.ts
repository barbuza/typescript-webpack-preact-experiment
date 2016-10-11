export function omit<R, O extends R>(obj: O, ...keys: string[]): R {
  const result = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && keys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  }
  return result as R;
}

export function assign<P, V extends P>(value: V, part: P): V {
  return Object['assign']({}, value, part);
}

export function delay(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function devDelay(time: number = 1000) {
  if (process.env.NODE_ENV === 'production') {
    return Promise.resolve();
  }
  return delay(time);
}
