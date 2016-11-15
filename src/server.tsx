/* tslint:disable:no-console */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { Provider } from 'mobx-react';
import { transaction } from 'mobx';
import { Store, ISerialized } from './stores';
import { Root } from './components/Root';
import { routes } from './serverRoutes';
import { checkAuth } from './support/auth';
import { promisedWhen } from './utils';

export async function renderPage(path: string, cookies: any): Promise<{ html: string, store: ISerialized }> {
  const history = createMemoryHistory();
  const store = new Store(null, {
    path,
    routes,
    history,
  });

  const authResult = await checkAuth(cookies.user || '');
  if (authResult) {
    transaction(() => {
      store.auth.user = authResult.user;
      store.auth.auth = authResult.auth;
    });
  }

  await promisedWhen(() => store.routing.isReady);

  console.log(store.toJSON());

  const html = renderToString(
    <Provider store={store} history={history}>
      <Root />
    </Provider>
  );

  return {
    is404: store.routing.is404,
    html,
    store: store.toJSON()
  };
}
