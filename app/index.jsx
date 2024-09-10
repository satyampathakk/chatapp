import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function index() {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>ooo great i am feeling lucky</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor:"black",
    
    justifyContent: 'center',
  },    
});
