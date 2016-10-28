import { connect } from 'mobx-preact';
import Component from '../lib/Component';

@connect
export default class Bar extends Component<{ id: string }, {}> {
  render() {
    return (
      <div>
        <div>bar, id = {this.props.id}</div>
        <div>user json = {JSON.stringify(this.store.auth.user)}</div>
      </div>
    );
  }
}
