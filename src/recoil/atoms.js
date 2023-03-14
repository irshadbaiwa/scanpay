import {atom} from 'recoil';
import {AtomKeys} from './atomkeys';

export const userOnboardingState = atom({
  key: AtomKeys.userOnboardingState,
  default: true,
});

export const userAuthState = atom({
  key: AtomKeys.userAuthState,
  default: true,
});
