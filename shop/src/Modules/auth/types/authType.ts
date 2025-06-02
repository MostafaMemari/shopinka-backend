import { UserState } from './userType';

export interface AuthState {
  isLogin: boolean;
  user: UserState | null;
  isLoading: boolean;
  error?: string | null;
}
