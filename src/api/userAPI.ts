/* tslint:disable:no-console */
export function signin(email: string, password: string): Promise<{ user: IUser, auth: IAuth }> {
  console.log('signin', { email, password });
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

export function signup(name: string, email: string, password: string): Promise<{ user: IUser, auth: IAuth }> {
  console.log('signup', { name, email, password });
  return Promise.resolve({
    user: {
      id: 1,
      email,
      name,
    },
    auth: {
      token: 'token',
    },
  });
}

export function saveUser(user: IUser, token: string): Promise<{ user: IUser, auth: IAuth }> {
  console.log('login', { user, token });
  return Promise.resolve({
    user,
    auth: { // update token?
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
