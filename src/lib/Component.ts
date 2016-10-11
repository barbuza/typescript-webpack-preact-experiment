import { Component as PreactComponent } from 'preact';
import { IContext } from './context';
import { IAction } from '../actions';

abstract class Component<P, S> extends PreactComponent<P, S> {

  protected readonly context: IContext;

  protected dispatch(action: IAction): void {
    this.context.dispatch(action);
  }

  protected get data(): IData {
    return this.context.data;
  }

}

export default Component;
