import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'; 
import { Link } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIPAddress } from '../../components/IpStorage';
import { getUsername } from '../../components/Storage';
import torUtils from '../../utils/torUtils';

const Chat = () => {
const registering=async()=>{
  const {TorPost}=torUtils()
  const ip=await getIPAddress()
  const username = await getUsername()
  const response = await TorPost(`${ip}/users`,{username:username})
  console.log(response)
}
  return (
    <SafeAreaView>
    <View className=" w-full  bg-white">
      <LinearGradient
        colors={['purple', 'white']}  
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View className="w-full h-[85%] flex-row  justify-between">
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
        </View>
        <View  className="w-full bottom-2/4">

<TouchableOpacity className=" w-full border-black border-2 bg-gray-50 -bottom-10" 
onPress={async()=>{await registering()}}
>
<Text>Click Here ! If Tor Daemon has Started to register you into the Server</Text>
</TouchableOpacity>
  <View className="">
    <Text className="text-md text-white Bold -bottom-20">
Passphrase !!!  remember it is State variable exiting will remove it from the memory ... Providing you the Extreme Security !!! 
    </Text>
  </View>
  <View className="-bottom-60 ">
    <Text className="text-xl text-white Bold">
      Welcome to my chat app..!!!
    </Text>
  </View>
</View>

      </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
