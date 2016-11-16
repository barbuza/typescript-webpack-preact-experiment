import { delay } from '../utils';

/* tslint:disable:no-console */
export async function signin(email: string, password: string): Promise<{ user: IUser, auth: IAuth }> {
  console.log('signin', { email, password });
  await delay(1000);
  return {
    user: {
      id: 1,
      email,
      name: 'sunify',
    },
    auth: {
      token: 'token',
      expired: '',
    },
  };
}

export async function signup(name: string, email: string, password: string): Promise<{ user: IUser, auth: IAuth }> {
  console.log('signup', { name, email, password });
  await delay(1000);
  return {
    user: {
      id: 1,
      email,
      name,
    },
    auth: {
      token: 'token',
      expired: '',
    },
  };
}

export async function saveUser(user: IUser, token: string): Promise<{ user: IUser, auth: IAuth }> {
  console.log('login', { user, token });
  await delay(1000);
  return {
    user,
    auth: { // update token?
      token: 'token',
      expired: '',
    },
  };
}

export async function getUser(id: number): Promise<IUser> {
  console.log('getUser', { id });
  await delay(200);
  return {
    id: 1,
    email: 'isuntc@gmail.com',
    name: 'sunify',
  };
}
