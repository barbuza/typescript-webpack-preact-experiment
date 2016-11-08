import * as React from 'react';
import { observer } from 'mobx-react';
import { expr } from 'mobx';
import * as classnames from 'classnames';
import { Component } from './Component';
import { omit } from '../utils';

@observer
export class Link extends Component<{ href: string, activeClass?: string } & React.HTMLProps<HTMLAnchorElement>, {}> {
  public render() {
    const className = classnames(
      this.props.className,
      expr(() => this.store.routing.path === this.props.href) && this.props.activeClass
    );
    return (
      <a {...omit(this.props, 'activeClass') } onClick={this.handleClick.bind(this)} className={className} />
    );
  }

  protected handleClick(e: MouseEvent) {
    e.preventDefault();
    if (this.store.routing.path !== this.props.href) {
      this.history.push(this.props.href);
    }
  }
}
