import {atom} from 'recoil';

export const userOnboardingState = atom({
  key: 'USER_ONBOARDING_STATE',
  default: false,
});

export const userAuthState = atom({
  key: 'USER_AUTH_STATE',
  default: false,
});

export const userDetails = atom({
  key: 'USER_PROFILE_DETAILS',
  default: {
    fullName: '',
    email: '',
    phone: '',
    walletId: '',
    walletBalance: 0,
  },
});

export const userTxHx = atom({
  key: 'USER_TRANSACTION_HISTORY',
  default: [],
});
