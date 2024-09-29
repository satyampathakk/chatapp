import { Alert } from 'react-native';
import axios from 'axios';
import NetworkProxy from 'react-native-network-proxy'

const fn = async () => {

const proxy = 'socks5h://127.0.0.1:9150';

const ownaxios=await NetworkProxy

// Send the request through Tor
axios.get('http://hwbl6cafsrwrcb4ulrsgst3jzfaf22a222744ovygty3ugkpnimygfid.onion/messages/Satyam/shivam', { httpAgent: agent, httpsAgent: agent })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
};

export default fn;
