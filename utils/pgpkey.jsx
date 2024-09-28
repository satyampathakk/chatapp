import AsyncStorage from '@react-native-async-storage/async-storage';

export const savekeys= async (pk,ppk) => {
    try {
      await AsyncStorage.setItem('publickey',pk);
      await AsyncStorage.setItem('privatekey',ppk);
      console.log(' saved successfully');
    } catch (error) {
      console.error('Error saving :', error);
    }
  };

export const getprivatekey= async () => {
try {

    const ppk = await AsyncStorage.getItem('privatekey');
    console.log("private key retrieved")
    if (ppk !== null) {
        return ppk;
      }
}catch(error){
console.error('Error retrieving Keys:', error);
}

}; 
export const publicKey= async () => {
  try {
      const pk = await AsyncStorage.getItem('publickey');
      if (pk !== null) {
        console.log("public key retrieved")
          return pk; 
        }
  }catch(error){
  console.error('Error retrieving Keys:', error);
  }
  
  }; 

export const clearkeys= async () => {
try{
    await AsyncStorage.removeItem('publickey');
    await AsyncStorage.removeItem('privatekey');
    console.log('keys cleared successfully');
}
catch(error){
    console.error('Error clearing keys:', error);
}
};