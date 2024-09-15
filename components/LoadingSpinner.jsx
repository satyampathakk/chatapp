import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingSpinner = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#3498db" />
    </View>
  );
};

export default LoadingSpinner;
