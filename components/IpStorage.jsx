import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsername } from './Storage';
import { router } from 'expo-router';
import axios from 'axios';
// let DEFAULT_IP_ADDRESS = 'http://16.171.206.219:80';
const ORBOT_HTTP_PROXY = 'http://127.0.0.1:8118'; 
const onionAddress = 'http://hwbl6cafsrwrcb4ulrsgst3jzfaf22a222744ovygty3ugkpnimygfid.onion';
export const saveIPAddress = async (ipAddress) => {
  try {
    const usr = await getUsername();
    await AsyncStorage.setItem('ipAddress', ipAddress);
    console.log('IP address saved successfully');
  } catch (error) {
    
      console.error('An unexpected error occurred:', error);
    
  }
};
export const getIPAddress = async () => {
  try {
    let ipAddress = await AsyncStorage.getItem('ipAddress');
    ipAddress=ipAddress?ipAddress:onionAddress
    const usr = await getUsername();
    const res=await axios.post(`${ipAddress}/users`,{username:usr})
    console.log(res)
    return ipAddress;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        console.log('working: Status 400 caught in catch block');
      } else {
        console.error(`Request failed with status ${error.response.status}`);
      }
    } else {
      console.error('Network error or request could not be made:', error.message);
    }

    return onionAddress;
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
