import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Slot ,Stack} from "expo-router"
import torUtils from '../utils/torUtils';

export default function App() {
  torUtils()
  return (
    <>
          <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
            <Stack.Screen name="(home)" options={{headerShown:false}} />
          </Stack>
      </>

  );
}

