import Component from '../lib/Component';
import { connect } from 'mobx-preact';

@connect
export default class Index extends Component<{}, {}> {
  render() {
    return <div>index</div>;
  }
}
