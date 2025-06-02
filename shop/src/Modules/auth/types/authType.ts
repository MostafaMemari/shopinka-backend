import { User } from './userType';

export interface AuthState {
  isLogin: boolean;
  user: User | null;
}
