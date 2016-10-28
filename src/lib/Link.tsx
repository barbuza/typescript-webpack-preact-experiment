import Component from './Component';

export default class Link extends Component<{ href: string } & JSX.HTMLAttributes, {}> {
  render() {
    return (
      <a {...this.props} onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </a>
    );
  }

  handleClick(e: MouseEvent) {
    e.preventDefault();
    if (this.store.routing.path !== this.props.href) {
      this.context.mobxStores.history.push(this.props.href);
    }
  }
}
