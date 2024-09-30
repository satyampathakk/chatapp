import axios from 'axios';
import { Alert } from 'react-native';

const checkTorConnection = async () => {
    const url = 'http://hwbl6cafsrwrcb4ulrsgst3jzfaf22a222744ovygty3ugkpnimygfid.onion/Satyam/shivahm/';
    const headers = {
        'Accept': 'application/json',
    };
    // Configure the proxy
    const proxy = {
        host: '127.0.0.1',
        port: 9050, // Default Tor SOCKS5 proxy port
        protocol: "socks"
    };

    try {
        const response = await axios.get(url, {
            headers,
            proxy: {
                host: proxy.host,
                port: proxy.port,
                protocol: proxy.protocol,
            },
        });
        const data = JSON.parse(response.data);
        Alert.alert("response by testonion",SON.stringify(data))

        // if (data.IsTor) {
        //     Alert.alert('Connected to Tor network');
        // } else {
        //     Alert.alert('Not connected to Tor network');
        // }
    } catch (error) {
        let val= JSON.stringify(error)
        Alert.alert("you are facing error here",val)
    }
};

export default checkTorConnection
