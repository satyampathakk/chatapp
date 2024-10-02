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
        Alert.alert('Logged in successfully');
        saveUsername(value);
        router.push('/Chat');
    }catch (error) {
      Alert.alert('Network Error', error.message || 'Something went wrong');
      router.push('/Chat');
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
