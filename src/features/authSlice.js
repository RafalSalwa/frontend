import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    userFetchSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, userFetchSuccess,  logoutSuccess } = authSlice.actions;
export default authSlice.reducer;