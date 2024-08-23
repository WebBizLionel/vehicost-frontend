import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Main Navigation 
import StackNavigator from './navigation/StackNavigator';
//Reducer
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './ reducers/user';

//Fonts
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; 
import { fontStyles } from './styles/fontsStyle';

// Store
const store = configureStore ({
  reducer: { user }
});

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
          <StackNavigator/>   
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
