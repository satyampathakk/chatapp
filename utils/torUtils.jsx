import { Alert } from 'react-native';
import Tor from 'react-native-tor';

let torInstance = null;

const torUtils = () => {
  if (!torInstance) {
    torInstance = Tor({ numberConcurrentRequests: 5, startDaemonOnActive: true , bootstrapTimeoutMs:120000 ,stopDaemonOnBackground:true});
    console.log("function called")
  }
  const TorGet = async (url) => {
    try {
      let response = await torInstance.get(url);
      // let res=atob(response.b64Data)
       return response.json
      // console.log('TorGet Response', JSON.stringify(response)); // Display response in Alert
    } catch (error) {
      
      Alert.alert('Error in TorGet:', error.message || error.toString());
      
      throw error;
    }
  };

  const TorPost = async (url, body) => {
    try {
      await torInstance.startIfNotStarted()
      const response = await torInstance.post(url, JSON.stringify(body));
      // Alert.alert('TorPost Response', JSON.stringify(response)); // Display response in Alert
    } catch (error) {
      Alert.alert('Error in TorPost:', error.message || error.toString());
      throw error;
    }
  };

  const TorDelete = async (url) => {
    try {
      await torInstance.startIfNotStarted()
      const response = await torInstance.delete(url);
      Alert.alert('TorDelete Response', JSON.stringify(response)); // Display response in Alert
    } catch (error) {
      Alert.alert('Error in TorDelete:', error.message || error.toString());
      throw error;
    }
  };



  return { TorGet, TorPost, TorDelete};
};

export default torUtils;
