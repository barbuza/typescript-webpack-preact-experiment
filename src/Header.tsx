import { Link } from 'preact-router';
import Component from './lib/Component';
import { ActionType } from './actions';

export default class Header extends Component<{}, {}> {

  renderUserTools() {
    if (this.data.authenticated) {
      return (
        <div>
          hello username
          <button onClick={() => this.dispatch({ type: ActionType.LOGOUT })}>logout</button>
        </div>
      );
    }

    return <div><button onClick={() => this.dispatch({ type: ActionType.LOGIN })}>login</button></div>;
  }

  render() {
    return (
      <header>
        {this.renderUserTools()}
        <nav>
          <Link href="/" style={{ marginRight: 10 }}>index</Link>
          <Link href="/foo" style={{ marginRight: 10 }}>foo</Link>
          <Link href="/bar/123" style={{ marginRight: 10 }}>bar 123</Link>
          <Link href="/bar/234" style={{ marginRight: 10 }}>bar 234</Link>
        </nav>
      </header>
    );
  }

}
