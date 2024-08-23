import { 
    StyleSheet, 
    Text, 
    View, 
} from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Create Stack Navigator
const Stack = createNativeStackNavigator();

//Navigation
import DrawerNavigator from './DrawerNavigator';

//Screen
import WelcomeScreen from '../screens/WelcomeScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import AddVehicleScreen from '../screens/AddVehicleScreen'
import AddFuelExpenseScreen from '../screens/AddFuelExpenseScreen';
import CameraScreen from '../screens/CameraScreen';
import AddInsuranceExpenseScreen from '../screens/AddInsuranceExpenseScreen';
import HomePageScreen from '../screens/HomePageScreen';

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bienvenue" component={WelcomeScreen} />
        <Stack.Screen name="Inscription" component={SignupScreen} />
        <Stack.Screen name="Connexion" component={SigninScreen} />
        <Stack.Screen name="Ajouter un vehicule" component={AddVehicleScreen} />
        <Stack.Screen name="Accueil" component={HomePageScreen} />
        <Stack.Screen name="Dépense carburant" component={AddFuelExpenseScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Dépense assurance" component={AddInsuranceExpenseScreen} />
       {/*  <Stack.Screen name="TabNavigator" component={TabNavigator} /> */}
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})