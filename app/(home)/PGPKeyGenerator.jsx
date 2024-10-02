import React, { useState } from 'react';
import { View, Text, Button, ScrollView, TextInput, StyleSheet } from 'react-native';
// import * as openpgp from 'react-native-openpgp';
import { generateKey } from 'openpgp/dist/openpgp';
import { savekeys } from '../../utils/pgpkey';
import { setUpub } from '../../utils/pubkeysetter';
import { getUsername } from '../../components/Storage';

const PGPKeyGenerator = () => {
  const [pgpKey, setPgpKey] = useState(null);
  const [passphrase, setPassphrase] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [username, setUsername] = useState(''); 
 
  // Function to generate random name and email
  const generateRandomNameAndEmail = () => {
    const randomName = `User${Math.floor(Math.random() * 10000)}`;
    const randomEmail = `${randomName}@example.com`;
    return { name: randomName, email: randomEmail };
  };
async function fn() {
  setStatusMessage('Generating PGP keys, please wait...');
}
  // Function to generate the PGP key
  const handleGenerateKey = async () => {
    const { name, email } = generateRandomNameAndEmail();
    await fn();
    const user=await getUsername()
    setUsername(user)
    try {
      const keyPair = await generateKey({
        userIDs: [{ name: name, email: email }],
        type:'ecc',
        curve: 'curve25519',
        passphrase:passphrase,
      });
      await savekeys(keyPair.publicKey,keyPair.privateKey)
      await setUpub(user,keyPair.publicKey)
      setPgpKey(keyPair);
      setStatusMessage('PGP keys generated successfully.');
    } catch (error) {
      console.error('Error generating PGP key:', error);
      setStatusMessage('Error generating PGP keys.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Passphrase and write it down anywhere for future"
        value={passphrase}
        onChangeText={setPassphrase}
      />
      <Button title="Generate PGP Key" onPress={handleGenerateKey} />
      
      {/* Display the status message */}
      <Text style={styles.statusMessage}>{statusMessage}</Text>
      
      {pgpKey && (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.keyLabel}>Public Key:</Text>
          <Text selectable style={styles.keyText}>{pgpKey.publicKey}</Text>
          <Text style={styles.keyLabel}>Private Key:</Text>
          <Text selectable style={styles.keyText}>{pgpKey.privateKey}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  scrollView: {
    marginTop: 20,
  },
  keyLabel: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  keyText: {
    marginBottom: 20,
  },
  statusMessage: { // New style for status message
    marginTop: 10,
    color: 'blue',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default PGPKeyGenerator;
