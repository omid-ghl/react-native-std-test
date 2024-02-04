import {GetCategoriesResponse} from '@Models';
import {ApiEndpointBuilder} from '@Services/api';

export const getCategories = (build: ApiEndpointBuilder) =>
  build.query<GetCategoriesResponse, {}>({
    query: () => 'category/',
  });
