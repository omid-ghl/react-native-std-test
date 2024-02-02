import {User} from '@Models';
import {userApi} from '@Services';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  user: User | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder =>
    builder.addMatcher(
      userApi.endpoints.checkToken.matchFulfilled,
      (state, {payload}) => {
        state.user = payload;
      },
    ),
});

export const {setToken, setUser, reset} = slice.actions;

export default slice.reducer;
