import {User} from '../User';

export interface SignupResponse {
  user: User;
  token: {
    access: string;
    refresh: string;
  };
}
