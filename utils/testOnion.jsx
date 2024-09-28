import axios from 'axios';

const checkTorConnection = async () => {
    const url = 'https://check.torproject.org/';
    const headers = {
        'Accept': 'application/json',
    };

    // Configure the proxy
    const proxy = {
        host: '127.0.0.1',
        port: 9050, // Default Tor SOCKS5 proxy port
        protocol: 'socks5',
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
        const data = response.data;
        if (data.IsTor) {
            console.log('Connected to Tor network');
        } else {
            console.log('Not connected to Tor network');
        }
        return data;
    } catch (error) {
        console.error('Error checking Tor connection:', error);
        throw error;
    }
};

export default checkTorConnection
