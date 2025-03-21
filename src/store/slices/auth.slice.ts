import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../interfaces';
import {loginThunk} from '../thunks';

interface AuthSliceType {
  data: User;
  loading: boolean;
  isAuthenticated: boolean;
  isInitialised: boolean;
}

const initialState: AuthSliceType = {
  data: null,
  loading: false,
  isAuthenticated: false,
  isInitialised: false,
};
export const authSlice = createSlice({
  name: 'auth.slice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    logout: state => {
      state.data = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.data = payload;
      });
  },
});
