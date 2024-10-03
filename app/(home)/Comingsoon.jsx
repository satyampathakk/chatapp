import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import SystemUsage from '../../components/SystemUsage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { clearUsername } from '../../components/Storage';
import { getIPAddress } from '../../components/IpStorage';
import torUtils from '../../utils/torUtils';
import { clearPassphrase, savePassphrase } from '../../utils/passphrase';

const Comingsoon = () => {
  const { TorGet } = torUtils();
  const isFocused = useIsFocused();
  const [edit,setEdit]=useState(true)
  const [sysusage, setSysusage] = useState({});
  const [isLoaded, setIsloaded] = useState(true);
  const [pass,setP]=useState('')
  
  const fetchSystemUsage = async () => {
    try {
      const ip = await getIPAddress();
      const response = await TorGet(`${ip}/system-usage`);
      const data = response;
      setSysusage(data);
    } catch (error) {
      console.error("Error fetching system usage:", error);
    } finally {
      setIsloaded(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchSystemUsage(); 
      const interval = setInterval(fetchSystemUsage, 20000);
      return () => clearInterval(interval); 
    }
  }, [isFocused]);

  return (
    <SafeAreaView>
      <LinearGradient 
        colors={['purple', 'black']}  
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        className="w-full h-screen"
      >
        <View className="flex-1 top-4">
          {isLoaded ? (
            <LoadingSpinner />
          ) : (
            <SystemUsage 
              cpu={sysusage.cpu_usage_percent} 
              tm={sysusage.total_memory} 
              fm={sysusage.free_memory} 
              um={sysusage.used_memory} 
              mp={sysusage.memory_usage_percent} 
            />
          )}

          <View className="-bottom-2/4 items-center border-red-400 border-2">
            <TouchableOpacity onPress={clearUsername}>
              <Text className="text-teal-400">Click Here to log Out!   </Text> 
            </TouchableOpacity>
          </View>
          <View className="h-10 bg-slate-600 z-10 flex-row items-center">
            <TextInput 
              value={pass}
              editable={edit}
              className="flex-1 text-white text-center text-lg" 
              placeholder="Type your message..."
              onChangeText={(newtext)=>setP(newtext)}
            /> 
          <TouchableOpacity className="w-10" onPress={async () => {
             if (edit) {
                  setEdit(false);
                  await savePassphrase(pass); 
                  } else {
                        setEdit(true);
                        await clearPassphrase(); 
                        }
                        }}>
            { edit ?<FontAwesome size={28} name="lock"  />
            :
            <FontAwesome size={28} name="unlock"  />
          }
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Comingsoon;
