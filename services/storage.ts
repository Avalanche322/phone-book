import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('jwtToken', token);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('jwtToken');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
