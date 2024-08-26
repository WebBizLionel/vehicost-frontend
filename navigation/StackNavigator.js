import { 
    StyleSheet, 
    Text, 
    View, 
} from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Style
import { gColor } from '../styles/variablesCSS';

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
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,  
        headerStyle: {
          backgroundColor:gColor.mainColor,
        },
        headerTintColor: '#ffffff',
        }}>

        <Stack.Screen name="Bienvenue" component={WelcomeScreen} />
        <Stack.Screen 
          name="Inscription"
          component={SignupScreen} 
          options={{
            headerShown: true, 
            title:'Inscription',
            animation:'slide_from_bottom',
            animation:'fade',
          }} 
        />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen 
          name="Connexion"
          component={SigninScreen}
          options={{
            headerShown: true, 
            title:'Connexion',
            animation:'fade',
          }} 
        />
        </Stack.Group>
        <Stack.Screen 
          name="Ajouter un vehicule" 
          component={AddVehicleScreen} 
          options={{
            headerShown: true, 
            title:'Ajouter un véhicule',
          }} 
        />
        <Stack.Screen name="Accueil" component={HomePageScreen} />
        <Stack.Screen name="Dépense carburant" component={AddFuelExpenseScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Dépense assurance" component={AddInsuranceExpenseScreen} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})