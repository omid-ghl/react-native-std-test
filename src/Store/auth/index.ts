import {User} from '@Models';
import {userApi} from '@Services';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {
  refreshToken: string | null;
  accessToken: string | null;
  user: User | null;
};

const initialState: AuthState = {
  refreshToken: null,
  accessToken: null,
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
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

export const {setRefreshToken, setAccessToken, setUser, reset} = slice.actions;

export default slice.reducer;
