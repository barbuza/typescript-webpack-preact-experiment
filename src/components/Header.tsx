import { connect } from 'mobx-preact-alt';
import { observable } from 'mobx';
import Component from './Component';
import Link from './Link';
import { LoginAction, LogoutAction } from '../actions';
import { onChange } from '../utils';

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

  render() {
    if (this.store.auth.user) {
      return (
        <div class={styles.userTools}>
          <div>hello {this.store.auth.user.name}</div>
          <button class={styles.button} onClick={() => this.emit(new LogoutAction)}>logout</button>
        </div>
      );
    }

    return (
      <div class={styles.userTools}>
        <input placeholder='username' value={this.usernameInput} {...onChange(val => this.usernameInput = val) } />
        <button class={styles.button} onClick={this.login.bind(this)}>login</button>
      </div>
    );
  }

}

export default class Header extends Component<{}, {}> {

  render() {
    return (
      <header class={styles.root}>
        <div class={styles.content}>
          <nav>
            <Link activeClassName={styles.active} class={styles.link} href="/">index</Link>
            <Link activeClassName={styles.active} class={styles.link} href="/foo">foo</Link>
            <Link activeClassName={styles.active} class={styles.link} href="/bar/123">bar-123</Link>
            <Link activeClassName={styles.active} class={styles.link} href="/bar/234">bar-234</Link>
          </nav>
          <UserTools />
        </div>
      </header>
    );
  }

}
