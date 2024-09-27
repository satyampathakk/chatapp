import * as openpgp from 'react-native-openpgp';
import { privateKey } from './pgpkey';

const decryptMessages = async (encryptedMessagesArray, passphrase) => {
  try {
    // Decrypt each message in the array
    const decryptedMessages = await Promise.all(
      encryptedMessagesArray.map(async (encryptedMessage) => {
        const decrypted = await openpgp.decrypt({
          message: encryptedMessage, // Decrypt each message individually
          privateKeys: [ await privateKey()],
          // passphrase: passphrase,
        });

        return decrypted.message.data; // Return the decrypted data
      })
    );

    return decryptedMessages; // Return the array of decrypted messages
  } catch (error) {
    console.error('Error decrypting messages:', error);
    throw error; // Optionally throw the error for the caller to handle
  }
};

export default decryptMessages;
