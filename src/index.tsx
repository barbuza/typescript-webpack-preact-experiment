import * as preact from 'preact';
import { createStore } from './lib/store';
import Provider from './lib/Provider';

import { reducer } from './reducer';
import Root from './Root';

const store = createStore(reducer, {
  authenticated: false
});

preact.render(<Provider store={store} component={Root} />, document.body);
