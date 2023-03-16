export const validatePassword = password => {
  return password.length > 0;
};

export const validatePhoneNumber = phone => {
  return phone.length >= 10 && phone.length <= 14;
};

export const validateName = fullName => {
  // Ensure 2 names (first and last) are provided at least
  const length = fullName.trim().split(' ').length;
  return length >= 2;
};

export const validateEmail = email => {
  return (
    email
      .trim()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ) !== null
  );
};

export const numberWithCommas = number => {
  if (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '0.00';
};

export const extractIdFromPhone = phone => {
  if (phone.startsWith('0')) {
    return phone.slice(1);
  }
  return phone;
};
