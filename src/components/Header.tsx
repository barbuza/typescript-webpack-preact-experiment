import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Component } from './Component';
import { Link } from './Link';
import { LoginAction, LogoutAction } from '../actions';
import { onChange } from '../utils';

@observer
class UserTools extends Component<{}, {}> {
  @observable
  protected username = '';

  protected login() {
    if (this.username.length) {
      this.emit(new LoginAction(this.username));
      this.username = '';
    }
  }

  public render() {
    if (this.store.auth.user) {
      return (
        <div className={styles.userTools}>
          <div>hello {this.store.auth.user.name}</div>
          <button className={styles.button} onClick={() => this.emit(new LogoutAction())}>logout</button>
        </div>
      );
    }

    return (
      <div className={styles.userTools}>
        <input placeholder="username" value={this.username} {...onChange(val => this.username = val) } />
        <button className={styles.button} onClick={this.login.bind(this)}>login</button>
      </div>
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
