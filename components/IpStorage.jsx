import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

let DEFAULT_IP_ADDRESS = 'http://13.51.121.227:80';

export const setDefaultIPAddress = (ipAddress) => {
  DEFAULT_IP_ADDRESS = ipAddress;
};

export const saveIPAddress = async (ipAddress) => {
  try {
    await AsyncStorage.setItem('ipAddress', ipAddress);
    console.log('IP address saved successfully');
  } catch (error) {
    console.error('Error saving IP address:', error);
  }
};

export const getIPAddress = async () => {
  try {
    const ipAddress = await AsyncStorage.getItem('ipAddress');
    if (ipAddress !== null) {
      return ipAddress; 
    } else {
      return DEFAULT_IP_ADDRESS;
    }
  } catch (error) {
    console.error('Error retrieving IP address:', error);
    return DEFAULT_IP_ADDRESS;
  }
};


export const clearIPAddress = async () => {
  try {
    await AsyncStorage.removeItem('ipAddress');
    console.log('IP address cleared successfully');

    router.push("/");
  } catch (error) {
    console.error('Error clearing IP address:', error);
  }
};

