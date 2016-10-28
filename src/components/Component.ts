import { Component as PreactComponent } from 'preact';
import { IContext } from '../context';
import { Action } from '../actions';
import Store from '../stores';

abstract class Component<P, S> extends PreactComponent<P, S> {

  protected readonly context: IContext;

  protected get store(): Store {
    return this.context.mobxStores.store;
  }

  protected emit<T>(action: Action<T>): T {
    return this.context.mobxStores.emit(action);
  }

}

export default Component;
