import {combineReducers} from '@reduxjs/toolkit';
import {authSlice} from './slices';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
});
