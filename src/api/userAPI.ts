/* tslint:disable:no-console */

export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface IAuth {
  token: string;
  expired: string;
}

export function login(email: string, password: string): Promise<{ user: IUser, auth: IAuth }> {
  console.log('login', { email, password });
  return Promise.resolve({
    user: {
      id: 1,
      email,
      name: 'sunify',
    },
    auth: {
      token: 'token',
    },
  });
}

export function getUser(id: number): Promise<IUser> {
  console.log('getUser', { id });
  return Promise.resolve({
    id: 1,
    email: 'isuntc@gmail.com',
    name: 'sunify',
  });
}
