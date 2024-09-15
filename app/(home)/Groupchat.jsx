import { StyleSheet, Text, View, ScrollView } from 'react-native';
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

const Groupchat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(''); 
  const isFocused = useIsFocused();
  const messageLoad = async () => {
    try {
      const ip=await getIPAddress()
      const res = await axios.get(`${ip}/messages/`);
      const response = await res.data;
      setMessages(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

    const loadCurrentUser = async () => {
      const user = await getUsername(); 
      setCurrentUser(user);
    };
    loadCurrentUser();

    let intervalId;
    if (isFocused) {
      messageLoad(); 
      intervalId = setInterval(messageLoad, 50000);
    } else {
      intervalId = setInterval(messageLoad, 300000);
    }
    return () => clearInterval(intervalId);
  }, [isFocused,setMessages]);

  return ( loading?<LoadingSprinner/> 
    :
    <LinearGradient 
      colors={['purple', 'black']}  
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      className="w-full h-auto flex-row justify-between "
    >
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

          {messages.map(({ id, msg, timestamp, username }) => (
            <View key={id} className={`justify-center ${username === currentUser ? 'items-end' : 'items-start'}`}>
              <MessageBox key={id} msg={msg} tmp={timestamp} usr={username} />
            </View>
          ))}

        </ScrollView>

        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} >
          <SendBox usr={currentUser} Mes={messageLoad} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Groupchat;
