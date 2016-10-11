import { assign } from '../lib/utils';
import { ActionType, IAction } from '../actions';

export default (data: IAuthData, action: IAction) => {
  switch (action.type) {

    case ActionType.LOGIN:
      return assign(data, { authenticated: true });

    case ActionType.LOGOUT:
      return assign(data, { authenticated: false });

    default:
      return data;

  }
}
