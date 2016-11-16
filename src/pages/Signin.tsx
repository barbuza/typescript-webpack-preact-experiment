import * as React from 'react';
import { observable } from 'mobx';
import { Component } from '../components/Component';
import { SigninAction } from '../actions/user';
import { observer } from 'mobx-react';

@observer
export class Signin extends Component<{}, {}> {

  @observable protected form = {
    email: '',
    password: '',
  };

  protected handleSubmit(e: Event) {
    e.preventDefault();
    this.store.emit(new SigninAction(this.form.email, this.form.password));
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h2>Signin</h2>
        <div>
          <input placeholder="Email" type="email" value={this.form.email} onChange={e => this.form.email = e.currentTarget.value}/>
        </div>
        <div>
          <input placeholder="Password" type="password" value={this.form.password} onChange={e => this.form.password = e.currentTarget.value}/>
        </div>
        <button type="submit">Sign in</button>
      </form>
    );
  }
}
