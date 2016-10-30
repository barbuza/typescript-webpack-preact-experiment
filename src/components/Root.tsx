import { h } from 'preact';
import { connect } from 'mobx-preact';
import Component from './Component';
import Header from './Header';
import PagePreloader from './PagePreloader';
import { merge } from '../utils';

@connect
export default class Root extends Component<{}, {}> {

  render() {
    const component = this.store.routing.component;
    const data = this.store.routing.data;
    const args = this.store.routing.args;
    let content = <div className={styles.loading}><PagePreloader/></div>;
    if (component && data && args) {
      content = h(component, merge(args, data));
    }
    return (
      <main className={styles.root}>
        <Header />
        {content}
      </main>
    );
  }
}
