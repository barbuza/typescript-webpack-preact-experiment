import * as React from 'react';
import { Component } from '../components/Component';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { Store } from '../stores';
import { EditAction } from '../actions/user';

export interface IArgs {
}

export interface IData {
}

@observer
export class Profile extends Component<IArgs & IData, {}> {

  @observable protected form = {
    name: (this.store.auth.user as IUser).name,
    email: (this.store.auth.user as IUser).email,
  };

  protected handleSubmit(e: Event) {
    e.preventDefault();
    const userData: IUser = { ...toJS(this.store.auth.user), ...toJS(this.form) };
    this.store.emit(new EditAction(userData));
  }

  public render() {
    const { user } = this.store.auth;

    if (!user) {
      return null;
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h2>Edit profile</h2>
        <div>
          <label>Name:<br />
            <input type="text" value={this.form.name} onChange={e => this.form.name = e.currentTarget.value}/>
          </label>
        </div>
        <div>
          <label>Email:<br />
            <input type="email" value={this.form.email} onChange={e => this.form.email = e.currentTarget.value}/>
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    );
  }
}

export function fetchData(store: Store): Promise<IData> {
  if (!store.auth.authenticated) {
    store.history.replace('/');
  }

  return Promise.resolve({});
}
