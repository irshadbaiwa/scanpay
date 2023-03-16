import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async key => {
  try {
    const item = await AsyncStorage.getItem(key);
    let value = null;
    if (item !== null) {
      value = JSON.parse(item);
    }
    return value;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const setItem = async (key, value) => {
  try {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(error);
    return null;
  }
};

const removeItem = async key => {
  try {
    return AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export default {
  getItem,
  setItem,
  removeItem,
};
