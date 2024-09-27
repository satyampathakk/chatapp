import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { getIPAddress } from './IpStorage'
// import encryptMessage from '../../utils/encrypt'
const SendBox = ({usr,Mes}) => {
  const [sendmsg,setSendmsg]=useState('')
  // const [encryptedMes,setEncryptedMes]=useState('')
  const  sendfunc = async () => {
    // setEncryptedMes(await encryptMessage({sendmsg,key}))
    const ip=await getIPAddress()
    console.log(ip)
    try{
      
      const response = await axios.post(`${ip}/messages/`, {
        username: usr,
        msg: sendmsg
      });
    
    console.log("working")
    setSendmsg('')
    res=response.data;
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