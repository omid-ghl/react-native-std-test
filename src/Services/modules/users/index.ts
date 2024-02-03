import {api} from '@Services/api';
import login from './login';
import signup from './signup';
import {checkUser} from './checkUser';
import checkToken from './checkToken';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    login: login(build),
    signup: signup(build),
    checkUser: checkUser(build),
    checkToken: checkToken(build),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyCheckUserQuery,
  useCheckTokenMutation,
} = userApi;
