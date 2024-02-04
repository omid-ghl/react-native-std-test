import {api} from '@Services/api';
import {getPosts} from './getPosts';
import {getCategories} from './getCategories';
import createPost from './createPost';
import deletePost from './deletePost';

export const postsApi = api.injectEndpoints({
  endpoints: build => ({
    getPosts: getPosts(build),
    getCategories: getCategories(build),
    createPost: createPost(build),
    deletepost: deletePost(build),
  }),
  overrideExisting: false,
});

export const {
  useGetPostsQuery,
  useLazyGetCategoriesQuery,
  useCreatePostMutation,
  useDeletepostMutation,
} = postsApi;
