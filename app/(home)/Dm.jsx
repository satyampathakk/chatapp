import { StyleSheet, Text, View, ScrollView ,TextInput, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import MessageBox from "../../components/MessageBox";
import { LinearGradient } from 'expo-linear-gradient';
import { getUsername } from '../../components/Storage';  
import { getIPAddress } from '../../components/IpStorage';
import Conversation from '../../components/Conversation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import torUtils from '../../utils/torUtils';
import { recipientPublicGetter} from '../../utils/savepubkey';
import { decrypt } from 'openpgp';

const Dm = () => {
  const [messages, setMessages] = useState([]);
  const [edit, setEdit] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [recipientKeys, setKey] = useState(null);
  const [ruser, setRuser] = useState('');
  const [ip, setIp] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const Loader = async () => {
      const ip = await getIPAddress();
      const user = await getUsername(); 
      setIp(ip);
      setCurrentUser(user);
    };
    Loader();
  }, []);

  const messageLoad = async () => {
    try {
      const { TorGet } = torUtils();  // Ensure torUtils returns an object with TorGet
      if (!ip || !currentUser || !ruser) return; // Add a check to avoid making invalid requests

      const res = await TorGet(`${ip}/messages/${currentUser}/${ruser}`);
      console.log(res); // Check if response is in expected format
      setMessages(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRecieve = async () => {
    let intervalId;
    if (isFocused) {
      await messageLoad(); 
      intervalId = setInterval(messageLoad, 50000);
    } else {
      intervalId = setInterval(messageLoad, 300000);
    }
    return () => clearInterval(intervalId);
  };

  return (
    <SafeAreaView>
      <LinearGradient 
        colors={['purple', 'black']}  
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="w-full h-full flex-row justify-between">
        <View style={{ flex: 1 }}>
          <View className="h-10 bg-slate-600 z-10 flex-row items-center">
            <TextInput 
              value={ruser}
              editable={edit}
              className="flex-1 text-white text-center text-lg" 
              placeholder="Type your message..."
              onChangeText={setRuser}
            /> 
            <TouchableOpacity className="w-10" onPress={() => {
              if (edit) {
                setEdit(false);
                const fn = async () => {
                  await handleRecieve();
                  let rk = await recipientPublicGetter(ruser);
                  setKey(rk);
                };
                fn();
              } else {
                setEdit(true);
              }
            }}>
              { edit ? <FontAwesome size={28} name="lock" /> : <FontAwesome size={28} name="unlock" /> }
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
            {messages.length > 0 ? (
              messages.map(({ msg, sender_username, recipient_username }) => (
                <View key={Math.random()} className={`justify-center ${sender_username === currentUser ? 'items-end' : 'items-start'}`}>
                  <MessageBox key={Math.random()} msg={msg} tmp={recipient_username} usr={sender_username} />
                </View>
              ))
            ) : (
              <Text className="items-center text-white justify-center">No messages available</Text>
            )}
          </ScrollView>

          <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <Conversation rkeys={recipientKeys} usr={currentUser} Mes={messageLoad} rusername={ruser} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Dm;
