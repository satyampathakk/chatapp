import { View,Text,TouchableOpacity } from 'react-native';
import React from 'react'
import { Image } from 'react-native';


const TabIcon = ({source,color}) => {
  return (
    <View >
        <Image source={source} 
        tintColor={color}
        resizeMode='contain'
        className="h-8 w-8 "
        ></Image>
    </View>
  )
}

export default TabIcon