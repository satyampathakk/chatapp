import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import TabIcon from '../../components/TabIcon';

const telegramIcon = require('../../assets/icons/telegram.png');
export default function Chatlayout() {

  return (
    <Tabs>
      {/* Home Screen Tab */}
      <Tabs.Screen 
        name="Chat" 
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }} 
      />

      <Tabs.Screen 
        name="Groupchat" 
        options={{
          title: 'Message',
          headerShown: false,
          tabBarIcon: ({ color ,focused }) => <TabIcon source={telegramIcon} size={28} color={color} focused={focused}  />
        }
      } 
      />

      <Tabs.Screen 
        name="Settings" 
        options={{
          title: 'Advance Settings',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }} 
      />
     
      <Tabs.Screen 
        name="Comingsoon" 
        options={{
          title: 'Coming Soon',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="hashtag" color={color} />,
        }} 
      />

      <Tabs.Screen 
        name="PGPKeyGenerator" 
        options={{
          title: 'PGPKManageMent',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="lock" color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="Dm" 
        options={{
          title: 'Dm',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="telegram" color={color} />,
        }} 
      />
    </Tabs>
    
  );
}
