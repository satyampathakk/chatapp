import { Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'; 
import { Link } from "expo-router";

const Chat = () => {
  return (
    <View className="h-screen w-full bg-white">
      <LinearGradient
        colors={['purple', 'white']}  
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="w-full h-[70%] flex-row justify-between"
      >
        <View className="w-[48%] h-2/5 ">
          <LinearGradient
            colors={['purple', 'black']} 
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            className="w-full h-full rounded-xl"
          >
            <Text className="text-gray-400 text-center top-5 ">
              Click Here to chat Anonymously 
              </Text>
              <Text className=" text-gray-400 text-center top-20" >
                <Link href='/Groupchat'className="text-gray-400 text-center top-5 "> Group Chat ! </Link>
              </Text>
          </LinearGradient>

        </View>

        <View className="w-[48%] h-2/5">
          <LinearGradient
            colors={['purple', 'black']}  
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            className="w-full h-full rounded-xl"
          >
          <Text className="text-gray-400 text-center top-5 ">
            See the System usage of our Server 
              </Text>
              <Text className=" text-gray-400 text-center top-20" >
                <Link href='/Comingsoon'className="text-gray-400 text-center top-5 "> System Usage ! </Link>
              </Text>
          </LinearGradient>
        </View>  
      </LinearGradient>
      <LinearGradient
        colors={['purple','purple']} 
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="w-full h-20 blur-3xl"
      >
      <View className="justify-center items-center ">
        <Text className="text-2xl text-white italic">
          Welcome to my chat app..!!!
        </Text>
      </View>
      </LinearGradient>
    </View>
  );
};

export default Chat;
