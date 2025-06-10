import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { app } from './app';
import { token } from './token';
import { profile } from './profile';
import { basket } from './basket';

export const rtkStore = configureStore({
  reducer: {
    app,
    basket,
    profile,
    token,
  },
});

export type RtkState = ReturnType<typeof rtkStore.getState>;
export type RtkDispatch = typeof rtkStore.dispatch;
export type ExtraParams = { };
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RtkState, ExtraParams, Action>;