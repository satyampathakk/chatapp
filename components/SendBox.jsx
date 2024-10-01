import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { getIPAddress } from './IpStorage'
import torUtils from '../utils/torUtils'
const SendBox = ({usr,Mes}) => {
  const [sendmsg,setSendmsg]=useState('')
  const {TorPost}=torUtils()
  const  sendfunc = async () => {
    const ip=await getIPAddress()
    try{  
      const response = await TorPost(`${ip}/messages/`, {
        username: usr,
        msg: sendmsg
      });
    
    console.log("working")
    setSendmsg('')
    Mes();}
    catch(error){
      console.log(error)
    }
  }
  return (
    <View  className="absolute bottom-0 flex-row w-screen">
        <TextInput 
        style={{height: 40}}
        value={sendmsg}
        onChangeText={(newtext)=> setSendmsg(newtext)}
        className="border-4 h-12 flex-1 text-white text-center text-lg bg-slate-600"
        ></TextInput>
        <TouchableOpacity
        onPress={sendfunc}
         className="border-4 w-20 h-10 border-slate-800  bg-slate-600">
          <Text className="text-white text-center text-lg">Send</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SendBox