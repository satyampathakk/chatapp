import Tor from 'react-native-tor'
import { useRef } from 'react'

const MyTorService=async()=>{
  const tor = useRef(Tor({numberConcurrentRequests:0,startDaemonOnActive:true,}))
  return tor.current
}


export const TorGet =async (url='http://hwbl6cafsrwrcb4ulrsgst3jzfaf22a222744ovygty3ugkpnimygfid.onion/Satyam/shivahm/')=>{
  try{
  const getReq=await MyTorService()
  const response =await getReq.get(url)
  return response
  }catch(error){
    console.error(error)
  }
  
}
export const TorPost= async(url,body)=>{
  try{
    const postReq=await MyTorService()
    const response =postReq.post(url,body)
    console.log(response)
  }catch{
    console.error(error)
  }
}
export const TorDelete= async ()=>{
  try{
    const deleteReq=await MyTorService()
    const response =deleteReq.delete(url,body)
    console.log(response)
  }catch(error)
  {
    console.error(error)
  }
}