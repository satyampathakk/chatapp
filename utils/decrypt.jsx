import * as openpgp from 'openpgp/dist/openpgp'
import { getprivatekey } from './pgpkey';
import { getPassphrase } from './passphrase';
const decrypt=async(mes)=>{
const privateKeyArmored=await getprivatekey()
const decmes= await openpgp.readMessage({armoredMessage: mes});
let passphrase=await getPassphrase()
const priKey = await openpgp.decryptKey({
    privateKey : await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase 
  });
    const encMes=await openpgp.decrypt({ message: decmes, decryptionKeys : priKey});
    return encMes
}
export default decrypt