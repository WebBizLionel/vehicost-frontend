import { StyleSheet, View, Text } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 

const TabNavigator = () => {
return (
<Tab.Navigator>


</Tab.Navigator>


  /*   <WelcomeScreen /> */
);
};


export default function App() {

  <NavigationContainer>
  <Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />

  <Stack.Screen name="SignUpScreen" component={SignInScreen} />

  <Stack.Screen name="TabNavigator" component={TabNavigator} />
  </Stack.Navigator>
  </NavigationContainer>

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
