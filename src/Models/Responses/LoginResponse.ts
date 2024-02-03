import {User} from '../User';

export interface LoginResponse {
  user: User;
  token: {
    access: string;
    refresh: string;
  };
}
