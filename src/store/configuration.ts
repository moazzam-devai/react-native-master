import {TypedUseSelectorHook} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './rootReducer';
import {useSelector as useReduxSelector} from 'react-redux';

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
