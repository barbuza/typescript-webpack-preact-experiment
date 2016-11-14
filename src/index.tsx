/* tslint:disable:no-console */
import * as React from 'react';
import * as Cookies from 'js-cookie';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { when } from 'mobx';
import { Store } from './stores';
import { parseUser } from './stores/auth';
import { RoutingState } from './stores/routing';
import { IAction } from './actions';
import { Root } from './components/Root';
import { routes } from './routes';

const history = createBrowserHistory();
const store = new Store({
  path: history.location.pathname,
  routes,
  user: parseUser(Cookies.get('user')),
});

history.listen(location => {
  store.routing.path = location.pathname;
});

function emit<T>(action: IAction<T>): T {
  console.debug('%cEMIT', 'font-weight: bold; color: white; background: black; padding: 2px 3px 0 3px', action);
  return action.react(store);
}

when(() => store.routing.state === RoutingState.READY, () => {
  const prealoder = document.getElementById('preloader');
  if (prealoder) {
    prealoder.parentNode.removeChild(prealoder);
  }

  render(
    <Provider store={store} history={history} emit={emit}>
      <Root />
    </Provider>,
    document.getElementById('app')
  );
});

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').Root;

    render(
      <Provider store={store} history={history} emit={emit}>
        <NextRoot />
      </Provider>,
      document.getElementById('app')
    );
  });

  module.hot.accept('./routes', () => {
    store.routing.routes = require('./routes').routes;
  });
}
