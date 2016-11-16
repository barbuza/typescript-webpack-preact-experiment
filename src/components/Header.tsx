import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Component } from './Component';
import { Link } from './Link';
import { SigninAction, LogoutAction } from '../actions/user';

@observer
class UserTools extends Component<{}, {}> {
  @observable protected email = '';
  @observable protected password = '';

  protected login() {
    if (this.email.trim().length && this.password.trim().length) {
      this.store.emit(new SigninAction(this.email, this.password));
      this.email = '';
      this.password = '';
    }
  }

  public render() {
    if (this.store.auth.user) {
      return (
        <div className={styles.userTools}>
          <div>
            hello, <Link href="/profile" className={styles.link} activeClass={styles.active}>{this.store.auth.user.name}</Link>
          </div>
          <button className={styles.button} onClick={() => this.store.emit(new LogoutAction())}>logout</button>
        </div>
      );
    }

    const saving = this.store.formsState.saving.get('signin');

    return (
      <div className={styles.userTools}>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.login();
          } }
          >
          <input
            placeholder="email"
            type="text"
            value={this.email}
            onChange={e => this.email = (e.target as HTMLInputElement).value}
            />
          <input
            placeholder="password"
            type="password"
            value={this.password}
            onChange={e => this.password = (e.target as HTMLInputElement).value}
            />
          <button disabled={saving} className={styles.button} type="submit">
            {saving ? '...' : 'login'}
          </button>
        </form>
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
            <Link activeClass={styles.active} className={styles.link} href="/profile">Profile</Link>
            <Link activeClass={styles.active} className={styles.link} href="/signup">Signup</Link>
            <Link activeClass={styles.active} className={styles.link} href="/bar/234">bar-234</Link>
            <Link activeClass={styles.active} className={styles.link} href="/spam/345">spam-234</Link>
          </nav>
          <UserTools />
        </div>
      </header>
    );
  }
}
