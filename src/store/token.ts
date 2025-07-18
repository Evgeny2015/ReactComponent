import { createSlice } from '@reduxjs/toolkit'
import { AppThunk, RtkState } from './store'

const tokenSlice = createSlice({
  name: 'token',
  initialState: localStorage.getItem('token'),
  reducers: {
    clear: () => null,
    generate: () => Math.random().toString(16),
  },
});
export const tokenActions = tokenSlice.actions;

export const tokenSelectors = {
  get: (state: RtkState): RtkState['token'] => {
    console.log('tokenSelectors get');

    return state.token;
  },
  authenticated: (state: RtkState): boolean => {
    return state.token !== null;
  }
};

const clearWithSaving = (): AppThunk => (dispatch, getState) => {
  dispatch(tokenActions.clear());
  console.log('token clearWithSaving');

  localStorage.removeItem('token');
};

const generateWithSaving = (): AppThunk => (dispatch, getState) => {
  console.log('token generateWithSaving');

  dispatch(tokenActions.generate());
  const state = getState();

  localStorage.setItem('token', state.token);
};

export const tokenThunks = {
  clearWithSaving,
  generateWithSaving,
};

export const token = tokenSlice.reducer;