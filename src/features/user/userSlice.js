import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  user: null,
  subscriptions: null,
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    addSubscription: (state, action) => {
      state.subscriptions = action.payload
    },
    logout: (state) => {
      state.user = null
    }
  }
});

export const { login, logout, addSubscription } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectSubscription = (state) => state.user.subscriptions;

export default userSlice.reducer;
