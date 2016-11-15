import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Component } from './Component';
import { Link } from './Link';
import { LoginAction, LogoutAction } from '../actions/user';
import { onChange } from '../utils';

@observer
class UserTools extends Component<{}, {}> {
  @observable protected email = '';
  @observable protected password = '';

  protected login() {
    if (this.email.trim().length && this.password.trim().length) {
      this.store.emit(new LoginAction(this.email, this.password));
      this.email = '';
      this.password = '';
    }
  }

  public render() {
    if (this.store.auth.user) {
      return (
        <div className={styles.userTools}>
          <div>hello {this.store.auth.user.name}</div>
          <button className={styles.button} onClick={() => this.store.emit(new LogoutAction())}>logout</button>
        </div>
      );
    }

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.login();
        }}
        className={styles.userTools}
      >
        <input placeholder="email" type="email" value={this.email} {...onChange(val => this.email = val) } />
        <input placeholder="password" type="password" value={this.password} {...onChange(val => this.password = val) } />
        <button className={styles.button} type="submit">login</button>
      </form>
    );
  }
}

export class Header extends Component<{}, {}> {
  public render() {
    return (
      <header className={styles.root}>
        <div className={styles.content}>
          <nav>
            <Link activeClass={styles.active} className={styles.link} href="/">index</Link>
            <Link activeClass={styles.active} className={styles.link} href="/foo">foo</Link>
            <Link activeClass={styles.active} className={styles.link} href="/bar/123">bar-123</Link>
            <Link activeClass={styles.active} className={styles.link} href="/bar/234">bar-234</Link>
            <Link activeClass={styles.active} className={styles.link} href="/spam/345">spam-234</Link>
          </nav>
          <UserTools />
        </div>
      </header>
    );
  }
}
