
import { IAction } from '../actions';
import auth_ from './auth';

export default (data: IData,action: IAction) => {
const auth=auth_(data.auth,action);
if(data.auth!==auth) {
return { auth };
}
return data;
}
