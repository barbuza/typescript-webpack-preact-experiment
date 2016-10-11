import { IAction } from '../actions';

export interface IStore {
  readonly data: IData;
  dispatch(action: IAction): void;
  on(handler: (data: IData) => void): void;
}

export function createStore(reducer: (data: IData, action: IAction) => IData, initial: IData): IStore {
  let data = initial;
  const handlers: Array<(data: IData) => void> = [];
  return {

    get data(): IData {
      return data;
    },

    dispatch(action: IAction) {
      data = reducer(data, action);
      handlers.forEach(handler => {
        handler(data)
      });
    },

    on(handler: (data: IData) => void) {
      handlers.push(handler);
    }

  };
}
