import {category} from '@Models';

declare namespace ICreatePost {
  type FormState = {
    title: string;
    description: string;
  };
  type IProps = {};
}

export {ICreatePost};
