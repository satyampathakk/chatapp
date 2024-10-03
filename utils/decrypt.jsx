import * as openpgp from 'openpgp/dist/openpgp'
import { getprivatekey } from './pgpkey';
import { getPassphrase } from './passphrase';
let cachedPrivateKey = null;

const getDecryptedPrivateKey = async () => {
  if (cachedPrivateKey) {
    return cachedPrivateKey;  
  }
  const privateKeyArmored = await getprivatekey();
  const passphrase = await getPassphrase();
  const priKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  });
  cachedPrivateKey = priKey;  
  return priKey;
};

const decryptMessage = async (mes) => {
  const decmes = await openpgp.readMessage({ armoredMessage: mes });
  const priKey = await getDecryptedPrivateKey();  // Use cached key

  const { data: decryptedMessage } = await openpgp.decrypt({
    message: decmes,
    decryptionKeys: priKey
  });

  return decryptedMessage;
};
export default decryptMessage;
