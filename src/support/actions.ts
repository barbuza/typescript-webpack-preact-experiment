import { Store } from '../stores';

export interface IAction<T> {
  react(store: Store): T;
}
