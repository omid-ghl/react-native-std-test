import {User} from '@Models';
import {ApiEndpointBuilder} from '@Services/api';

export const checkUser = (build: ApiEndpointBuilder) =>
  build.query<User, void>({
    query: () => 'user/me/',
    providesTags: ['User'],
  });
