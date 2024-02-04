import {category} from '@Models';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type CategoriesType = {
  categories: category[];
};

const initialState: CategoriesType = {
  categories: [],
};

const slice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<category[]>) => {
      state.categories = action.payload;
    },
    reset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {setCategories, reset} = slice.actions;

export default slice.reducer;
