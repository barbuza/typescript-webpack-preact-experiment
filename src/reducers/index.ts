import { IAction } from '../actions';
import auth from './auth';

export default (data: IData, action: IAction) => {
  return {
    auth: auth(data.auth, action)
  };
}
