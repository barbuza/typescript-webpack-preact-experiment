import { IAction, ActionType } from './actions';
import { assign } from './lib/utils';

export function reducer(data: IData, action: IAction) {
  switch (action.type) {

    case ActionType.LOGIN:
      return assign(data, { authenticated: true });

    case ActionType.LOGOUT:
      return assign(data, { authenticated: false });

    default:
      return data;

  }
}
