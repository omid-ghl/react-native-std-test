import {LoginRequest, LoginResponse} from '@Models';
import {ApiEndpointBuilder} from '@Services/api';

export default (build: ApiEndpointBuilder) =>
  build.mutation<LoginResponse, LoginRequest>({
    query: loginRequest => ({
      url: 'user/sign-in/',
      body: loginRequest,
      method: 'POST',
    }),
  });
