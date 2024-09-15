import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity ,TextInput} from 'react-native'
import { useEffect ,useState} from 'react'
import axios from 'axios';
import { router ,Redirect } from 'expo-router';
import { saveUsername } from './Storage';

const CustomButton = () => {
  const [value,setValue]=useState('')
  const postData = async () => {

    try {
      
      const response = await axios.post('http://13.51.121.227:80/users/', { username: `${value}` });
      saveUsername(value)
      router.push("/Chat")
    } catch (error) {
      if (error.response && error.response.status === 400) {
        saveUsername(value)
        router.push("/Chat")
      } else {
        console.error("Error occurred:", error.response ? error.response.data : error.message);
      }
    }
  };
  return (
    <View >
      <TextInput
        style={{height: 40}}
        placeholder="Type your username!"
        onChangeText={newText => setValue(newText)} 
        className="border-4 w-screen h-12  text-white text-center text-lg bg-slate-600"
      />
      <TouchableOpacity onPress={()=>postData()} className=" border-4 w-screen h-10 border-slate-800  bg-slate-600 " >
        <Text className="text-white text-center text-lg">
        Click here to Continue!
      </Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton