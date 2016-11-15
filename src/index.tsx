import * as React from 'react';
import * as Cookies from 'js-cookie';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { when } from 'mobx';
import { Store } from './stores';
import { RoutingState } from './stores/routing';
import { Root } from './components/Root';
import { routes } from './routes';
import { checkAuth } from './support/auth';

const history = createBrowserHistory();
const store = new Store({
  path: history.location.pathname,
  routes,
  history,
});

history.listen(location => {
  store.routing.path = location.pathname;
});

checkAuth(Cookies.get('user')).then(result => {
  if (result) {
    store.auth.user = result.user;
    store.auth.auth = result.auth;
  }

  when(() => store.routing.state === RoutingState.READY, () => {
    const prealoder = document.getElementById('preloader');
    if (prealoder) {
      prealoder.parentNode.removeChild(prealoder);
    }

    render(
      <Provider store={store} history={history}>
        <Root />
      </Provider>,
      document.getElementById('app')
    );
  });
});

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').Root;

    render(
      <Provider store={store} history={history}>
        <NextRoot />
      </Provider>,
      document.getElementById('app')
    );
  });

  module.hot.accept('./routes', () => {
    store.routing.routes = require('./routes').routes;
  });
}
