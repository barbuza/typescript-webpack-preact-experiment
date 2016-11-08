import * as React from 'react';
import { IAction } from '../actions';
// import { IContext } from '../context';
import { IHistory } from 'history';
import { Store } from '../stores';

export abstract class Component<P, S> extends React.Component<P, S> {
  static contextTypes = {
    mobxStores: React.PropTypes.object.isRequired
  };

  protected get store(): Store {
    return (this.context as any).mobxStores.store;
  }

  protected get history(): IHistory {
    return (this.context as any).mobxStores.history;
  }

  protected emit<T>(action: IAction<T>): T {
    return (this.context as any).mobxStores.emit(action);
  }
}
