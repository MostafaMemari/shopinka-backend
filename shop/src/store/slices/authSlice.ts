import { AuthState } from '@/Modules/auth/types/authType';
import { User } from '@/Modules/auth/types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  isLogin: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
