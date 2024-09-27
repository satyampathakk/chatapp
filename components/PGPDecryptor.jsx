import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as openpgp from 'react-native-openpgp';

const PGPDecryptor = ({ privateKey, passphrase }) => {
  const [encryptedMessages, setEncryptedMessages] = useState([]);
  const [decryptedMessages, setDecryptedMessages] = useState([]);

  const handleDecrypt = async () => {
    try {
      const decrypted = await openpgp.decrypt({
        messages: encryptedMessages,
        privateKeys: [privateKey],
        passphrase: passphrase,
      });
      setDecryptedMessages(decrypted.map((message) => message.message.data));
    } catch (error) {
      console.error('Error decrypting messages:', error);
    }
  };

  return (
    <View>
      <TextInput
        multiline
        placeholder="Enter encrypted messages (one per line)"
        value={encryptedMessages.join('\n')}
        onChangeText={(text) => setEncryptedMessages(text.split('\n'))}
      />
      <Button title="Decrypt" onPress={handleDecrypt} />
      {decryptedMessages.length > 0 && (
        <ScrollView>
          {decryptedMessages.map((message, index) => (
            <Text key={index}>Decrypted Message {index + 1}: {message}</Text>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default PGPDecryptor;