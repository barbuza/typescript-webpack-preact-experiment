import { h } from 'preact';
import { connect } from 'mobx-preact';
import Component from './Component';
import Header from './Header';
import PagePreloader from './PagePreloader';
import { merge } from '../utils';

@connect
class Content extends Component<{}, {}> {
  render() {
    const component = this.store.routing.component;
    const data = this.store.routing.data;
    const args = this.store.routing.args;
    if (component && data && args) {
      return h(component, merge(args, data));
    }
    return <div className={styles.loading}><PagePreloader/></div>;
  }
}

export default class Root extends Component<{}, {}> {

  render() {
    return (
      <main className={styles.root}>
        <Header />
        <Content />
      </main>
    );
  }
}
