import { connect } from 'mobx-preact-alt';
import { expr } from 'mobx';
import * as classnames from 'classnames';
import Component from './Component';
import { omit } from '../utils';

@connect
export default class Link extends Component<{ href: string, activeClass?: string } & JSX.HTMLAttributes, {}> {
  public render() {
    const className = classnames(
      this.props.class,
      expr(() => this.store.routing.path === this.props.href) && this.props.activeClass
    );
    return (
      <a {...omit(this.props, 'activeClass') } onClick={this.handleClick.bind(this)} class={className} />
    );
  }

  protected handleClick(e: MouseEvent) {
    e.preventDefault();
    if (this.store.routing.path !== this.props.href) {
      this.context.mobxStores.history.push(this.props.href);
    }
  }
}
