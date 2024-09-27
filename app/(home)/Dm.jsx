import { StyleSheet, Text, View, ScrollView ,TextInput, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from "axios";
import { useIsFocused } from '@react-navigation/native';
import MessageBox from "../../components/MessageBox";
import SendBox from '../../components/SendBox';
import { LinearGradient } from 'expo-linear-gradient';
import { getUsername } from '../../components/Storage';  
import LoadingSprinner from '../../components/LoadingSpinner';
import { getIPAddress } from '../../components/IpStorage';
import { publicKey } from '../../utils/pgpkey';
import Conversation from '../../components/Conversation';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Dm = () => {
  const [messages, setMessages] = useState([]);
  const [edit,setEdit]=useState(true)
  const [currentUser, setCurrentUser] = useState('');
  const [keys,setkey] = useState([]);
  const [mescount,setmesCount]=useState(false)
  const [ruser, setRuser] = useState('');
  const isFocused = useIsFocused();
  const messageLoad = async () => {
    try {
      const ip=await getIPAddress()

      const user = await getUsername(); 
      setCurrentUser(user);
      const res = await axios.get(`${ip}/messages/${currentUser}/${ruser}`);
      const response = await res.data;
      setMessages(await response);
      setmesCount(false)
    } catch (error) {
      if(error.response.status===404){
        setmesCount(false)
        return
      }
      console.error(error);
    }
  };
  const handleRecieve=async()=>{
    let intervalId;
    if (isFocused) {
      await messageLoad(); 
      intervalId = setInterval(messageLoad, 50000);
    } else {
      intervalId = setInterval(messageLoad, 300000);
    }
    return () => clearInterval(intervalId);
  }


  // useEffect(() => {

  //   const loadCurrentUser = async () => {
  //     const user = await getUsername(); 
  //     setCurrentUser(user);
  //   };
  //   loadCurrentUser();

  //   let intervalId;
  //   if (isFocused) {
  //     messageLoad(); 
  //     intervalId = setInterval(messageLoad, 50000);
  //   } else {
  //     intervalId = setInterval(messageLoad, 300000);
  //   }
  //   return () => clearInterval(intervalId);
  // }, [setMessages]);

  return ( mescount?<Text> There is no conversation between you send hi!</Text>
    :
    <SafeAreaView>
    <LinearGradient 
      colors={['purple', 'black']}  
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className="w-full h-full flex-row justify-between ">
      <View style={{ flex: 1 }}>
      <View className="h-10 bg-slate-600 z-10 flex-row items-center">
            <TextInput 
              value={ruser}
              editable={edit}
              className="flex-1 text-white text-center text-lg" 
              placeholder="Type your message..."
              onChangeText={setRuser}
            /> 
            <TouchableOpacity className="w-10" onPress={()=>{
              if(edit)
                {
                  setEdit(false)
                  handleRecieve()
            }
            else{
              setEdit(true)
            }
            }}>
            { edit ?<FontAwesome size={28} name="lock"  />
            :
            <FontAwesome size={28} name="unlock"  />
          }
            </TouchableOpacity>
          </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 80, }}>
        {messages.length > 0 ? (
              messages.map(({ msg ,sender_username , recipient_username }) => (
                <View key={Math.random()} className={`justify-center ${sender_username === currentUser ? 'items-end' : 'items-start'}`}>
                  <MessageBox key={Math.random()} msg={msg} tmp={recipient_username} usr={sender_username} />
                </View>
              ))
            ) : (
              <Text className="items-center text-white justify-center" >No messages available</Text>
            )}
        </ScrollView>

        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} >
          <Conversation usr={currentUser} Mes={messageLoad} rusername={ruser} />
        </View>
      </View>
    </LinearGradient>
    </SafeAreaView>
  );
};

export default Dm;
