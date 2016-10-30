import { IAction } from './actions';
import Store from './stores';
import { IHistory } from 'history';

export interface IContext {
  mobxStores: {
    store: Store;
    emit<T>(action: IAction<T>): T;
    history: IHistory;
  };
}
