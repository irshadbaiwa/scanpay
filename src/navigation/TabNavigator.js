import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavRoutes} from './NavRoutes';
import {Text} from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/Home';
import WalletScreen from '../screens/Wallet';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0c2840',
        tabBarInactiveTintColor: '#a3a3a3',
        tabBarActiveBackgroundColor: '#e2e8f0',
      }}
      initialRouteName={NavRoutes.Home}>
      <Tab.Screen
        name={NavRoutes.Home}
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text fontSize="xs" fontWeight="medium" color={color}>
              Home
            </Text>
          ),
          tabBarIcon: ({focused, color}) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={NavRoutes.Wallet}
        component={WalletScreen}
        options={{
          tabBarLabel: ({focused, color}) => (
            <Text fontSize="xs" fontWeight="medium" color={color}>
              Wallet
            </Text>
          ),
          tabBarIcon: ({focused, color}) => (
            <Ionicons name="wallet" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
