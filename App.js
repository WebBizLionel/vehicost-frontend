import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './screens/WelcomeScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import AddVehicleScreen from './screens/AddVehicleScreen'
import AddFuelExpenseScreen from './screens/AddFuelExpenseScreen';
import CameraScreen from './screens/CameraScreen';
import AddInsuranceExpenseScreen from './screens/AddInsuranceExpenseScreen'
import HomePageScreen from './screens/HomePageScreen'

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './ reducers/user';

//Fonts
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; 
import { fontStyles } from './styles/fontsStyle';

// style

const store = configureStore ({
  reducer: { user }
});



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


/* @TODO make bottomtab */
const TabNavigator = () => {
  return (
    /*<Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Map') {
          iconName = 'location-arrow';
        } else if (route.name === 'Places') {
          iconName = 'map-pin';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ec6e5b',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Places" component={PlacesScreen} />
    </Tab.Navigator>*/
    <></>
  );
};


export default function App() {

  //fonts
  const [loaded, error] = useFonts(fontStyles);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }




  return (
    <Provider store={store}>
       <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Add Vehicle" component={AddVehicleScreen} />
          <Stack.Screen name="Sign Up" component={SignupScreen} />
          <Stack.Screen name="Sign in" component={SigninScreen} />
          <Stack.Screen name="Add Fuel Exprense" component={AddFuelExpenseScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Add Insurance Expense" component={AddInsuranceExpenseScreen} />
          <Stack.Screen name="Acceuil" component={HomePageScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
