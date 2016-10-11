import * as preact from 'preact';
import { IStore } from './store';
import { IContext } from './context';

interface IStatelessRootComponent {
  (): JSX.Element;
}

type IRootComponent = preact.ComponentConstructor<{}, {}> | IStatelessRootComponent;

export default class Provider extends preact.Component<{ store: IStore, component: IRootComponent }, {}> {

  getChildContext(): IContext {
    return {
      data: this.props.store.data,
      dispatch: this.props.store.dispatch
    };
  }

  componentDidMount() {
    this.props.store.on(() => this.setState({}));
  }

  render() {
    return preact.h(this.props.component as any, {});
  }

}
