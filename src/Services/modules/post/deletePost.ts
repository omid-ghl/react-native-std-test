import {DeletePostRequest} from '@Models';
import {DeletePostResponse} from '@Models/Responses/DeletePostResponse';
import {ApiEndpointBuilder} from '@Services/api';

export default (build: ApiEndpointBuilder) =>
  build.mutation<DeletePostResponse, DeletePostRequest>({
    query: ({postId}) => ({
      url: `post/crud/${postId}`,
      method: 'DELETE',
    }),
  });
