import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import SystemUsage from '../../components/SystemUsage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { clearUsername } from '../../components/Storage';
import { getIPAddress } from '../../components/IpStorage';
import torUtils from '../../utils/torUtils';

const Comingsoon = () => {
  const { TorGet } = torUtils();
  const isFocused = useIsFocused();
  const [sysusage, setSysusage] = useState({});
  const [isLoaded, setIsloaded] = useState(true);
  
  const fetchSystemUsage = async () => {
    try {
      const ip = await getIPAddress();
      const response = await TorGet(`${ip}/system-usage`);
      const data = response.data;
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
      const interval = setInterval(fetchSystemUsage, 50000);
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

          <View className="-bottom-10 items-center border-red-400 border-2">
            <TouchableOpacity onPress={clearUsername}>
              <Text className="text-teal-400">Click Here to log Out!</Text> 
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Comingsoon;
