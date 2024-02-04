export interface GetPostsResponse {
  count: number;
  next: number;
  previous: number;
  results: Post[];
}

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  category: Category;
  author: Author;
}

interface Author {
  id: number;
  full_name: string;
}

interface Category {
  id: number;
  slug: string;
  name: string;
}
