import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsername } from './Storage';
import { router } from 'expo-router';
import axios from 'axios';

let DEFAULT_IP_ADDRESS = 'http://16.171.206.219:80';

export const setDefaultIPAddress = (ipAddress) => {
  DEFAULT_IP_ADDRESS = ipAddress;
};

export const saveIPAddress = async (ipAddress) => {
  try {
    let usr= await getUsername()
    const res=await axios.post(`${ipAddress}/users/`,{ username : `${usr}` })
    if (res.status===400){
      console.log("working")
    }
    await AsyncStorage.setItem('ipAddress', ipAddress);
    console.log('IP address saved successfully');
  } catch (error) {
    console.error('Error saving IP address:', error);
  }
};

export const getIPAddress = async () => {
  try {
    
    let ipAddress = await AsyncStorage.getItem('ipAddress');
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

