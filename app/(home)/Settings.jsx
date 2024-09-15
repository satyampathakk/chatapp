import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getIPAddress, saveIPAddress, clearIPAddress, setDefaultIPAddress } from '../../components/IpStorage'; 

const IPAddressScreen = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [defaultIP, setDefaultIP] = useState('');

  useEffect(() => {
    const fetchIPAddress = async () => {
      const currentIP = await getIPAddress();
      setIpAddress(currentIP);
    };

    fetchIPAddress();
  }, []);

  const handleSave = async () => {
    await saveIPAddress(inputValue);
    setIpAddress(inputValue);
    Alert.alert('Success', 'IP address saved successfully');
  };

  const handleClear = async () => {
    await clearIPAddress();
    const currentIP = await getIPAddress();  // Get the default IP after clearing
    setIpAddress(currentIP);
    Alert.alert('Success', 'IP address cleared successfully');
  };

  const handleChangeDefault = () => {
    setDefaultIPAddress(defaultIP);
    Alert.alert('Success', 'Default IP address updated successfully');
  };

  return (
    <LinearGradient
      colors={['#0000FF', '#FF0000']} // Blue to Red gradient
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.label}>Current IP Address:</Text>
        <Text style={styles.ipAddress}>{ipAddress}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter new IP address"
          value={inputValue}
          onChangeText={setInputValue}
        />

        <Button title="Save IP Address" onPress={handleSave} />
        <Button title="Clear IP Address" onPress={handleClear} color="red" />

        <Text style={styles.label}>Change Default IP Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter default IP address"
          value={defaultIP}
          onChangeText={setDefaultIP}
        />
        <Button title="Update Default IP Address" onPress={handleChangeDefault} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ipAddress: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default IPAddressScreen;
