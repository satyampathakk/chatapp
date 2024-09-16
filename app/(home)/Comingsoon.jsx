import {View, Text, Image, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'
import SystemUsage from '../../components/SystemUsage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Link } from 'expo-router';
import { clearUsername } from '../../components/Storage';
import { getIPAddress } from '../../components/IpStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
const Comingsoon = () => {
const isFocused = useIsFocused();
const usageLoaders= ()=>{
  const asyncLoader=async () =>{
    const ip=await getIPAddress()
    const response = await axios.get(`${ip}/system-usage`);
    const data =response.data
    console.log(data)
    setSysusage(data)
    setIsloaded(false)
  }
  asyncLoader()
  let interval;
  if (isFocused) {
    asyncLoader(); 
    interval = setInterval(asyncLoader, 50000);
  } else {
    interval = setInterval(asyncLoader, 300000);
  }
  return () => clearInterval(interval);
}
  const[sysusage,setSysusage]=useState({})
  const[isLoaded,setIsloaded]=useState(true)
useEffect(usageLoaders,[isFocused])
  return (
    <SafeAreaView>
    <LinearGradient 
    colors={['purple', 'black']}  
    start={{ x: 0, y: 1 }}
    end={{ x: 1, y: 0 }}
    className="w-full h-screen"
>
<View className="flex-1 top-4">
  {isLoaded?(
  <LoadingSpinner/> 
  ):(
  <SystemUsage cpu={sysusage.cpu_usage_percent} tm={sysusage.total_memory} fm={sysusage.free_memory} um={sysusage.used_memory} mp={sysusage.memory_usage_percent} />
)}
<View className="-bottom-10 items-center border-red-400 border-2">
  <TouchableOpacity onPress={clearUsername}>
   <Text className=" text-teal-400">Click Here to log Out! </Text> 
  </TouchableOpacity>
  </View>
    </View>
    </LinearGradient>
    </SafeAreaView>
  );
};

export default Comingsoon;