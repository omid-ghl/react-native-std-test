import {api} from '@Services/api';
import {checkToken} from './checkToken';
import login from './login';
import signup from './signup';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    login: login(build),
    signup: signup(build),
    checkToken: checkToken(build),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyCheckTokenQuery,
  useCheckTokenQuery,
} = userApi;
