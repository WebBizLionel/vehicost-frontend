import { StyleSheet, SafeAreaView, Text, Button, TouchableOpacity, Linking } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function WelcomeScreen({ navigation } ) {

 /*  const handleSubmit = () => {
    if (EMAIL_REGEX.test(email)) {
      dispatch(updateEmail(email));
      navigation.navigate('TabNavigator', { screen: 'Gallery' });
    } else {
      setEmailError(true);
    }
  }; */

  
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

  return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.welcomeText}>Bienvenue dans VehiCost</Text>
    <TouchableOpacity style={styles.button} /* onPress={() => handleSubmit()} */ >
         <Text style={styles.text}> INSCRIPTION </Text>
 </TouchableOpacity>
 <Text>Vous avez déjà un compte ? </Text>
  <Text onPress={() => Linking.openURL('https://withfra.me')}> Se connecter </Text>
  <Text onPress={() => Linking.openURL('https://withfra.me')}> Accéder au mode démo </Text>
  <Text onPress={() => Linking.openURL('https://withfra.me')}> Contacter le support</Text>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 28,
    padding: 50,
  }, 
  button: {
    borderRadius: 40,
    backgroundColor: '#DC564E',
    padding: 15,

  },
  text: {
    color: '#FFFFFF',
  }
})