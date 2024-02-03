import {SignupRequest, SignupResponse} from '@Models';
import {ApiEndpointBuilder} from '@Services/api';
import {Platform} from 'react-native';

export default (build: ApiEndpointBuilder) =>
  build.mutation<SignupResponse, SignupRequest>({
    query: ({first_name, last_name, email, password, image}) => {
      const data = new FormData();

      data.append('first_name', first_name);
      data.append('last_name', last_name);
      data.append('email', email);
      data.append('password', password);

      if (image) {
        data.append('image', {
          uri: Platform.OS === 'ios' ? `file://${image}` : image,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      }

      return {
        url: 'user/sign-up/',
        body: data,
        method: 'POST',
      };
    },
  });
