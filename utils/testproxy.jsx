import axios from "axios";
import { Alert } from "react-native";
const testProxy = async () => {
    ORBOT_HTTP_PROXY='socks5h://localhost:9150'
    const proxyAxios = axios.create({
        baseURL: ORBOT_HTTP_PROXY,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    try {
        const res = await proxyAxios.get('https://check.torproject.org/');

        Alert.alert("response by testonion",JSON.stringify(res))
    } catch (error) {
        Alert.alert("Error testing proxy:" ,error.status);
    }
};
export default testProxy
