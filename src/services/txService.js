import Storage from '../async-storage';
import {setRecoil, getRecoil} from 'recoil-nexus';
import {userDetails, userTxHx} from '../recoil/atoms';
import {STORAGE_KEYS} from '../async-storage/storage-keys';

// --------- LOAD USER TX HX ------------
export const loadUserTxHx = async walletId => {
  // get all txs from storage
  let txs = await Storage.getItem(STORAGE_KEYS.transactions);
  if (!txs) {
    txs = [];
  }

  // filter and sort txs
  const userTxs = txs
    .filter(
      tx => tx.senderAccount === walletId || tx.receiverAccount === walletId,
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  // store in state
  setRecoil(userTxHx, userTxs);
};

// --------- RECORD TX -----------
export const recordTx = async (
  senderAccount,
  senderName,
  receiverAccount,
  receiverName,
  amount,
  timestamp,
  narration,
) => {
  // get all tx hx from storage
  let txs = await Storage.getItem(STORAGE_KEYS.transactions);
  if (!txs) {
    txs = [];
  }

  // update tx hx
  const newTx = {
    senderAccount,
    senderName,
    receiverAccount,
    receiverName,
    amount,
    timestamp,
    narration,
  };

  const updatedTxs = [...txs, newTx];
  await Storage.setItem(STORAGE_KEYS.transactions, updatedTxs);

  // update user tx hx
  const prevTxs = getRecoil(userTxHx);
  setRecoil(userTxHx, [newTx, ...prevTxs]);

  // update user wallet Balance
  const user = getRecoil(userDetails);

  // ******...new
  if (senderAccount === user.walletId) {
    const newBalance = parseFloat(user.walletBalance) - parseFloat(amount);
    setRecoil(userDetails, {...user, walletBalance: newBalance});

    // persist to storage
    // get users
    let users = await Storage.getItem(STORAGE_KEYS.users);
    if (!users) {
      users = [];
    }

    // filter users
    const otherUsers = users.filter(
      u =>
        u.walletId !== user.walletId &&
        u.phone !== user.phone &&
        u.email !== user.email,
    );

    let updatedUsers = [
      ...otherUsers,
      {
        ...user,
        walletBalance: newBalance,
      },
    ];

    // get beneficiary
    const beneficiary = otherUsers.filter(
      u => u.walletId === receiverAccount,
    )[0];
    if (beneficiary !== undefined) {
      const beneficiaryNewBalance =
        parseFloat(beneficiary.walletBalance) + parseFloat(amount);
      updatedUsers = [
        ...otherUsers.filter(u => u.walletId !== beneficiary.walletId),
        {...beneficiary, walletBalance: beneficiaryNewBalance},
        {
          ...user,
          walletBalance: newBalance,
        },
      ];
    }

    await Storage.setItem(STORAGE_KEYS.users, updatedUsers);
  } else if (receiverAccount === user.walletId) {
    const newBalance = parseFloat(user.walletBalance) + parseFloat(amount);
    setRecoil(userDetails, {...user, walletBalance: newBalance});

    // persist to storage
    // get users
    let users = await Storage.getItem(STORAGE_KEYS.users);
    if (!users) {
      users = [];
    }

    // filter users
    const otherUsers = users.filter(
      u =>
        u.walletId !== user.walletId &&
        u.phone !== user.phone &&
        u.email !== user.email,
    );

    let updatedUsers = [
      ...otherUsers,
      {
        ...user,
        walletBalance: newBalance,
      },
    ];

    await Storage.setItem(STORAGE_KEYS.users, updatedUsers);
  }
  // *****...end
};
