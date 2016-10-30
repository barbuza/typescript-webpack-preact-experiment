import { connect } from 'mobx-preact-alt';
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
        <div className={styles.userTools}>
          <div>hello {this.store.auth.user.name}</div>
          <button className={styles.button} onClick={() => this.emit(new LogoutAction)}>logout</button>
        </div>
      );
    }

    return (
      <div className={styles.userTools}>
        <input placeholder='username' value={this.usernameInput} {...onChange(this.setUsername.bind(this)) } />
        <button className={styles.button} onClick={this.login.bind(this)}>login</button>
      </div>
    );
  }

}

export default class Header extends Component<{}, {}> {

  render() {
    return (
      <header className={styles.root}>
        <div className={styles.content}>
          <nav>
            <Link activeClassName={styles.active} className={styles.link} href="/">index</Link>
            <Link activeClassName={styles.active} className={styles.link} href="/foo">foo</Link>
            <Link activeClassName={styles.active} className={styles.link} href="/bar/123">bar-123</Link>
            <Link activeClassName={styles.active} className={styles.link} href="/bar/234">bar-234</Link>
          </nav>
          <UserTools />
        </div>
      </header>
    );
  }

}
