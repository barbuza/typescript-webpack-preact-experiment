declare interface IUser {
  id: number;
  email: string;
  name: string;
}

declare interface IAuth {
  token: string;
  expired: string;
}