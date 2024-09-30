import axios from "axios";
import { Alert } from "react-native";
import Tor from 'react-native-tor'
const testProxy = async () => {

        try {
        const res = await proxyAxios.get('https://check.torproject.org/');

        Alert.alert("response by testonion",JSON.stringify(res))
    } catch (error) {
        Alert.alert("Error testing proxy:" ,error.status);
    }
};
export default testProxy
