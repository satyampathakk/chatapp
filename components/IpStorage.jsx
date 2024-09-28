import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsername } from './Storage';
import { router } from 'expo-router';
import axios from 'axios';
import testProxy from '../utils/testproxy';
import Tor from 'react-native-tor';
import check from '../utils/testOnion';
let DEFAULT_IP_ADDRESS = 'http://16.171.206.219:80';
const ORBOT_HTTP_PROXY = 'http://127.0.0.1:8118'; 
const onionAddress = 'http://hwbl6cafsrwrcb4ulrsgst3jzfaf22a222744ovygty3ugkpnimygfid.onion/';
export const saveIPAddress = async (ipAddress) => {
  try {
    const onionAddress = 'http://check.torproject.org/';
    const val=await testProxy()
    console.log(val)
    const usr = await getUsername();
    response =await check()

console.log(response)
    




    await AsyncStorage.setItem('ipAddress', ipAddress);
    console.log('IP address saved successfully');
  } catch (error) {
    
      console.error('An unexpected error occurred:', error);
    
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
