import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView ,Image,ImageBackground ,TextInput} from 'react-native';
import { Link } from "expo-router"
import { SafeAreaView  } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { clearUsername , saveUsername, getUsername } from '../components/Storage';
import { router } from 'expo-router';
const a=require("../assets/icons/home.webp");
import { useEffect,useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

export default function index() {
  const isFocused = useIsFocused();
  const checkIfLoggedIn =async () => {
    const username = await getUsername();
    if (username!=null) {
      return true;
    }
  }
  useEffect(() => {
    const status= async () =>{
    if ( await checkIfLoggedIn()){
      router.push("/Chat")
    };
  }
  status();
  }, [isFocused]);
  return (
<SafeAreaView className="">
<StatusBar backgroundColor="#1c1917" style="light" />
  <ScrollView contentContainerStyle={{height:'100%'}}>
    <View className=" h-screen w-full  ">
      <ImageBackground source={a}  className="w-full h-full  ">
        <View className="absolute bottom-4 " >

        <CustomButton ></CustomButton>
      </View>

      </ImageBackground>
    </View>
    
  </ScrollView>
  
</SafeAreaView>
  );
}

