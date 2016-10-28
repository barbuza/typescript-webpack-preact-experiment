import Component from '../lib/Component';
import Header from './Header';
import Routes from '!routes!../routes.yml';

export default class Root extends Component<{}, {}> {

  render() {
    return (
      <main>
        <Header />
        <Routes />
      </main>
    );
  }
}
