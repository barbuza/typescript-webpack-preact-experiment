import { connect } from 'mobx-preact-alt';
import { expr } from 'mobx';
import * as classnames from 'classnames';
import Component from './Component';
import { omit } from '../utils';

@connect
export default class Link extends Component<{ href: string, activeClassName?: string } & JSX.HTMLAttributes, {}> {

  render() {
    const className = classnames(
      this.props.className,
      expr(() => this.store.routing.path === this.props.href) && this.props.activeClassName
    );
    return (
      <a {...omit(this.props, 'activeClassName')} onClick={this.handleClick.bind(this)} className={className}/>
    );
  }

  handleClick(e: MouseEvent) {
    e.preventDefault();
    if (this.store.routing.path !== this.props.href) {
      this.context.mobxStores.history.push(this.props.href);
    }
  }
}
