/* tslint:disable:no-console */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { Provider } from 'mobx-react';
import { when } from 'mobx';
import { Store } from './stores';
import { RoutingState } from './stores/routing';
import { Root } from './components/Root';
import { routes } from './serverRoutes';
import { checkAuth } from './support/auth';

export function renderPage(pathname: string, cookies: any): any {
  return new Promise((resolve: (result: any) => void) => {
    checkAuth(cookies.user || '').then(result => {
      const history = createMemoryHistory();
      const store = new Store({
        path: pathname,
        routes,
        history,
      });

      if (result) {
        store.auth.user = result.user;
        store.auth.auth = result.auth;
      }

      when(() => store.routing.state === RoutingState.READY, () => {
        resolve([
          renderToString(
            <Provider store={store} history={history}>
              <Root />
            </Provider>
          ),
          // toJSON(store),
        ]);
      });
    });
  });

}
