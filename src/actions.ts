export enum ActionType {
  LOGIN,
  LOGOUT
}

export interface IAction {
  type: ActionType;
}

export interface ILoginAction extends IAction {
  type: ActionType.LOGIN;
}

export interface ILogoutAction extends IAction {
  type: ActionType.LOGOUT;
}
