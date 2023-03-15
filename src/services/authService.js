import {MMKV} from '../mmkv-storage';
import {setRecoil, getRecoil} from 'recoil-nexus';
import {userAuthState} from '../recoil/atoms';

export const signup = () => {
  const authState = getRecoil(userAuthState);
  setRecoil(userAuthState, true);
};

export const login = () => {
  const authState = getRecoil(userAuthState);
  setRecoil(userAuthState, true);
};

export const logout = () => {
  setRecoil(userAuthState, false);
};
