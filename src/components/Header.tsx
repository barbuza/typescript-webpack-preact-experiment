import { connect } from 'mobx-preact';
import { observable } from 'mobx';

import Component from './Component';
import Link from './Link';
import { LoginAction, LogoutAction } from '../actions';


function onChange(handler: JSX.GenericEventHandler) {
  return {
    onKeyPress: handler,
    onKeyUp: handler,
    onChange: handler,
    onKeyDown: handler
  };
}

@connect
class UserTools extends Component<{}, {}> {

  @observable
  protected usernameInput = '';

  protected login() {
    if (this.usernameInput.length) {
      this.emit(new LoginAction(this.usernameInput));
      this.usernameInput = '';
    }
  }

  protected setUsername(e: Event) {
    const input = e.target as HTMLInputElement;
    this.usernameInput = input.value;
  }

  render() {
    if (this.store.auth.user) {
      return (
        <div>
          hello {this.store.auth.user.name}
          <button style={{ marginLeft: 10 }} onClick={() => this.emit(new LogoutAction)}>logout</button>
        </div>
      );
    }

    return (
      <div>
        <input placeholder='username' value={this.usernameInput} {...onChange(this.setUsername.bind(this)) } />
        <button style={{ marginLeft: 10 }} onClick={this.login.bind(this)}>login</button>
      </div>
    );
  }

}

export default class Header extends Component<{}, {}> {

  render() {
    return (
      <header>
        <UserTools />
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
