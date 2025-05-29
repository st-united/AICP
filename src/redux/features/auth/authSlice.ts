import { createSlice } from '@reduxjs/toolkit';

import { getStorageData } from '@app/config';
import { ACCESS_TOKEN, USER_PROFILE } from '@app/constants';
import { UserProfile } from '@app/interface/user.interface';

interface AuthState {
  isAuth: boolean;
  user: UserProfile | null;
  permissions: string[];
}

const checkAuth = (): boolean => Boolean(getStorageData(ACCESS_TOKEN));
const getUserProfile = (): UserProfile | null => {
  const data = getStorageData(USER_PROFILE);
  if (!data) return null;
  return data;
};

const initialState: AuthState = {
  isAuth: checkAuth(),
  user: getUserProfile(),
  permissions: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    setAuth(state, action) {
      const { user, permissions } = action.payload;
      state.user = user;
      state.permissions = permissions;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
    },
  },
});

const { reducer, actions } = authSlice;

export const { setAuth, logout, login } = actions;

export default reducer;
