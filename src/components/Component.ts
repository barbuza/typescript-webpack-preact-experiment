import { Component as PreactComponent } from 'preact';
import { IAction } from '../actions';
import { IContext } from '../context';
import Store from '../stores';

abstract class Component<P, S> extends PreactComponent<P, S> {
  protected readonly context: IContext;

  protected get store(): Store {
    return this.context.mobxStores.store;
  }

  protected emit<T>(action: IAction<T>): T {
    return this.context.mobxStores.emit(action);
  }

  protected forceUpdate() {
    this.setState({} as S);
  }
}

export default Component;
