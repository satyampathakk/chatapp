import * as openpgp from 'openpgp/dist/openpgp'
import { getprivatekey } from './pgpkey';
const decrypt=async(mes)=>{
const privateKeyArmored=await getprivatekey()
const decmes= await openpgp.readMessage({armoredMessage: mes});
let passphrase="Helllo";
const priKey = await openpgp.decryptKey({
    privateKey : await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  });
    const encMes=await openpgp.decrypt({ message: decmes, decryptionKeys : priKey});
    console.log(encMes);
}
export default decrypt