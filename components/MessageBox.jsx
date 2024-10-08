import { Text, View } from 'react-native';
import { getUsername } from './Storage';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const MessageBox = ({  msg, usr, tmp }) => {
  return (
    <View className="border-2 rounded-xl w-3/5 border-pink-600 p-2 m-2 ">
      <LinearGradient
        colors={['purple', 'pink']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="w-full p-4 rounded-lg"
      >
        <Text className="text-yellow-50 font-bold mb-1">{usr}</Text>

        <Text className="text-yellow-50 mb-1">{msg}</Text>

       {tmp? <Text className="text-yellow-50 text-right">{tmp}</Text>: 
       <Text>
        
       </Text>
       }
      </LinearGradient>
    </View>
  );
};

export default MessageBox;
