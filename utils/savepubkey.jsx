import AsyncStorage from "@react-native-async-storage/async-storage";
import torUtils from "./torUtils";
import { getIPAddress } from "../components/IpStorage";
export const saveRecipientPub=async(user,pub)=>{
    try {
        await AsyncStorage.setItem(`${user}`, pub);
        console.log("saved Recipient Public key")
    }catch(error){
        console.log(error);
    }
}
export const getRecipientPub=async (user)=>{
    try {
        const pub = await AsyncStorage.getItem(`${user}`)
        return pub
    }catch(error)
    {
        return null
    }
}
export const recipientPublicGetter=async(user)=>{
    const {TorGet}=torUtils()
    const rpubKey=await getRecipientPub()
    try {
if(rpubKey){
    return rpubKey
}
else{
    const ip=await getIPAddress()
    const rkey=await TorGet(`${ip}/users/${user}/details`)
    await saveRecipientPub(user,rkey)
    return rkey
}
}catch(error){
    console.log(error)
}
}

