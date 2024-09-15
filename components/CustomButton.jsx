import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { saveUsername } from './Storage';
import { getIPAddress } from './IpStorage';
import * as Network from 'expo-network';
const CustomButton = () => {
  const [value, setValue] = useState('');

  const postData = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      if (!networkState.isConnected) {
        Alert.alert('Network Error', 'No network connection available');
      }
      else{
        Alert.alert("network available")
      }
      const ip = await getIPAddress();
      const response = await fetch(`${ip}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: value }), 
      });

      if (response.ok) {
        Alert.alert('Logged in successfully');
        saveUsername(value);
        router.push('/Chat');
      } else if (response.status === 400) {
        Alert.alert('Logged in with old UserName');
        saveUsername(value);
        router.push('/Chat');
      } else {
        const errorData = await response.json();
        Alert.alert('Error occurred', errorData.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Network Error', error.message || 'Something went wrong');
    }
  };

  return (
    <View>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type your username!"
        onChangeText={(newText) => setValue(newText)}
        value={value}
        className="border-4 w-screen h-12 text-white text-center text-lg bg-slate-600"
      />
      <TouchableOpacity onPress={() => postData()} className="border-4 w-screen h-10 border-slate-800 bg-slate-600">
        <Text className="text-white text-center text-lg">Click here to Continue!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
