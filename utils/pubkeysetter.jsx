import { Alert } from "react-native"
import { getIPAddress } from "../components/IpStorage"
import torUtils from "./torUtils"
export const setUpub=async (user,ukey)=>{
    const ip=await getIPAddress()
    const {TorPost} =  torUtils()
    try{
    const response =await TorPost(`${ip}/details/${user}`,{     
        public_key:ukey
    })
    Alert.alert("saved on server")
}catch(error){
    Alert.alert(JSON.stringify(error))
}
}