import Storage from '../async-storage';
import {setRecoil, getRecoil, resetRecoil} from 'recoil-nexus';
import {
  userAuthState,
  userDetails,
  userOnboardingState,
  userTxHx,
} from '../recoil/atoms';
import {STORAGE_KEYS} from '../async-storage/storage-keys';
import {extractIdFromPhone} from '../utils/helpers';

export const signup = async (fullName, email, phone, password) => {
  const authenticated = getRecoil(userAuthState);
  if (authenticated) return;

  let users = await Storage.getItem(STORAGE_KEYS.users);
  if (!users) {
    users = [];
  }

  // ensure user does not exist
  if (
    users.filter(u => u.phone === phone || u.email === email)[0] !== undefined
  ) {
    throw new Error('User exist');
  }

  updatedUsers = [
    ...users,
    {
      fullName,
      email,
      phone,
      password,
      walletId: extractIdFromPhone(phone),
      walletBalance: 0,
    },
  ];
  await Storage.setItem(STORAGE_KEYS.users, updatedUsers);

  // populate user state
  setRecoil(userDetails, {
    fullName,
    email,
    phone,
    password,
    walletId: extractIdFromPhone(phone),
    walletBalance: 0,
  });
  setRecoil(userAuthState, true);
};

export const login = async (phone, password) => {
  const authenticated = getRecoil(userAuthState);
  if (authenticated) return;

  // get users
  let users = await Storage.getItem(STORAGE_KEYS.users);
  if (!users) {
    throw new Error('Account does not exist');
  }

  // match the right user
  const user = users.filter(
    u => u.phone === phone && u.password === password,
  )[0];

  if (user === undefined) {
    throw new Error('Account does not exist');
  }

  // populate user state
  setRecoil(userDetails, {
    ...user,
  });

  setRecoil(userAuthState, true);
};

export const logout = () => {
  // clear user state
  resetRecoil(userDetails);
  resetRecoil(userTxHx);
  resetRecoil(userAuthState);
};

export const completeOnboarding = async () => {
  setRecoil(userOnboardingState, true);
  await Storage.setItem(STORAGE_KEYS.userOnboarded, true);
};
