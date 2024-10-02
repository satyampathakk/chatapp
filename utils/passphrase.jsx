import AsyncStorage from '@react-native-async-storage/async-storage';

const PASS_PHRASE_KEY = 'passphrase';

export const savePassphrase = async (passphrase) => {
  try {
    await AsyncStorage.setItem(PASS_PHRASE_KEY, passphrase);
  } catch (error) {
    console.error('Error saving passphrase:', error);
  }
};

export const getPassphrase = async () => {
  try {
    const passphrase = await AsyncStorage.getItem(PASS_PHRASE_KEY);
    return passphrase;
  } catch (error) {
    console.error('Error retrieving passphrase:', error);
  }
};

export const clearPassphrase = async () => {
  try {
    await AsyncStorage.removeItem(PASS_PHRASE_KEY);
  } catch (error) {
    console.error('Error clearing passphrase:', error);
  }
};

