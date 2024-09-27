import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as openpgp from 'react-native-openpgp';

const PGPEncryptor = ({ publicKey }) => {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState(null);

  const handleEncrypt = async () => {
    try {
      const encrypted = await openpgp.encrypt({
        message: message,
        publicKeys: [publicKey],
      });
      setEncryptedMessage(encrypted);
    } catch (error) {
      console.error('Error encrypting message:', error);
    }
  };

  return (
    <View>
      <TextInput
        multiline
        placeholder="Enter your message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Encrypt" onPress={handleEncrypt} />
      {encryptedMessage && (
        <Text>Encrypted Message: {encryptedMessage}</Text>
      )}
    </View>
  );
};

export default PGPEncryptor;