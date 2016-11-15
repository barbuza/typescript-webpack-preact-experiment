import { IAuth, IUser, getUser } from '../api/userAPI';

export function checkAuth(cookiesUser: string): Promise<{user: IUser, auth: IAuth} | null> {
  if (!cookiesUser) {
    return Promise.resolve(null);
  }

  const cookies: { auth: IAuth, id: number } = JSON.parse(cookiesUser);

  return getUser(cookies.id).then(user => ({
    user,
    auth: cookies.auth,
  }));
}
