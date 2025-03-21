import {createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../api';
import {Login, User} from '../../interfaces';

export const loginThunk = createAsyncThunk<User, Login>(
  'authentication/login',
  async (data, thunkAPI) => {
    try {
      const response = await API.Auth.login(data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
