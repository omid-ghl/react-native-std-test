import {GetRefreshTokenResponse, GetRefreshTokenRequest} from '@Models';
import {ApiEndpointBuilder} from '@Services/api';

export default (build: ApiEndpointBuilder) =>
  build.mutation<GetRefreshTokenResponse, GetRefreshTokenRequest>({
    query: tokenRequest => ({
      url: 'user/refresh/',
      body: tokenRequest,
      method: 'POST',
    }),
  });
