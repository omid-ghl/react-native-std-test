import {GetPostsResponse} from '@Models';
import {ApiEndpointBuilder} from '@Services/api';

export const getPosts = (build: ApiEndpointBuilder) =>
  build.query<GetPostsResponse, any>({
    query: () => 'post/crud/',
    transformResponse: rawResult => {
      return rawResult?.results;
    },
  });
