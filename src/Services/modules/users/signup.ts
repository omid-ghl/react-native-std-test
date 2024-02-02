import {SignupRequest, SignupResponse} from '@Models';
import {ApiEndpointBuilder} from '@Services/api';

export default (build: ApiEndpointBuilder) =>
  build.mutation<SignupResponse, SignupRequest>({
    query: signupRequest => ({
      url: 'user/sign-up',
      body: signupRequest,
      method: 'POST',
    }),
  });
