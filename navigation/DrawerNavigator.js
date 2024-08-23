import { useState } from "react";
import { 
  StyleSheet,
  Text, 
  View, 
  Button 
} from 'react-native';

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Navigation
import TabNavigator from './TabNavigator';

// Create Drawer Navigation
const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }
  
  function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  

const DrawerNavigator = ({navigation}) => {
   
  return (
    <Drawer.Navigator initialRouteName="Ajouter un vehicule">
        <Drawer.Screen name="test1" component={HomeScreen} />
        <Drawer.Screen name="test2" component={NotificationsScreen} />
        <Drawer.Screen name="TabNavigator" component={TabNavigator}/>
      </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})