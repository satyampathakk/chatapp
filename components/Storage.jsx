import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { clearkeys } from '../utils/pgpkey';

export const saveUsername = async (username) => {
    try {
      await AsyncStorage.setItem('username', username);
      console.log('Username saved successfully');
    } catch (error) {
      console.error('Error saving username:', error);
    }
  };

export const getUsername = async () => {
try {
    const username = await AsyncStorage.getItem('username');
    if (username !== null) {
        return username; 
      }
}catch(error){
console.error('Error retrieving username:', error);
}

}; 

export const clearUsername= async () => {
try{
    await AsyncStorage.removeItem('username');
    console.log('Username cleared successfully');
    clearkeys();
    router.push("/")
}
catch(error){
    console.error('Error clearing username:', error);
}
};