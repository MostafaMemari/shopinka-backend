// store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/Modules/auth/types/authType';
import { UserState } from '@/Modules/auth/types/userType';

const initialState: AuthState = {
  isLogin: false,
  user: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<UserState>) {
      state.isLogin = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
