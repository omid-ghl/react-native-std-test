import {CreatePostRequest, CreatePostResponse} from '@Models';
import {ApiEndpointBuilder} from '@Services/api';
import {Platform} from 'react-native';

export default (build: ApiEndpointBuilder) =>
  build.mutation<CreatePostResponse, CreatePostRequest>({
    query: ({title, description, categoryId, image}) => {
      const data = new FormData();

      data.append('title', title);
      data.append('description', description);
      data.append('category', categoryId);

      if (image) {
        data.append('image', {
          uri: Platform.OS === 'ios' ? `file://${image}` : image,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      }

      return {
        url: 'post/crud/',
        body: data,
        method: 'POST',
      };
    },
  });
