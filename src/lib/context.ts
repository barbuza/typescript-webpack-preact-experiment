import { Action } from '../actions';
import Store from '../stores';
import { IHistory } from 'history';

export interface IContext {
  mobxStores: {
    store: Store;
    emit<T>(action: Action<T>): T;
    history: IHistory;
  };
}
