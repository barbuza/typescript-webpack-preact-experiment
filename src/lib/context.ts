import { IAction } from '../actions';

export interface IContext {
  data: IData;
  dispatch: (action: IAction) => void;
}
