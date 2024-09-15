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
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }} 
      />

      <Tabs.Screen 
        name="Groupchat" 
        options={{
          title: 'Message',
          tabBarIcon: ({ color ,focused }) => <TabIcon source={telegramIcon} size={28} color={color} focused={focused}  />
        }} 
      />

      <Tabs.Screen 
        name="Settings" 
        options={{
          title: 'Advance Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }} 
      />
     
      <Tabs.Screen 
        name="Comingsoon" 
        options={{
          title: 'Coming Soon',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }} 
      />


    </Tabs>
  );
}
