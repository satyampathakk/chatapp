import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { getIPAddress } from './IpStorage'
import encrypt from '../utils/encrypt'
import  decryptMessage  from '../utils/decrypt'
import { publicKey } from '../utils/pgpkey'
const Conversation = ({usr,Mes,rusername}) => {
  const [sendmsg,setSendmsg]=useState('')

  const  sendfunc = async () => {
    try {
      const pub=await publicKey()
      const encryptedMessage = await encrypt(sendmsg,pub);
      // const a=await decryptMessage(encryptedMessage)
      // console.log(a)
      const ip = await getIPAddress();


      const response = await axios.post(`${ip}/messages/send/`, {
        sender_username: usr,
        msg: encryptedMessage, // Send the encrypted message
        recipient_username: rusername,
      });

      setSendmsg(''); 
      Mes(); 
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle the error and display a message to the user
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

export default Conversation