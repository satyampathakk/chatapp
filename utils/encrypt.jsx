import  * as openpgp from 'openpgp/dist/openpgp'
import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import 'react-native-get-random-values';
import { createMessage ,readKey ,encrypt} from 'openpgp/dist/openpgp';

const encrypter=async(message,recipient_pubkey)=>{
    const mes=await createMessage({text: message});
    const pubKey=await readKey({armoredKey: recipient_pubkey});
    const encMes=await encrypt({message: mes, encryptionKeys : [pubKey]});
    return encMes;
}
export default encrypter