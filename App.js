import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

// Main Navigation
import StackNavigator from "./navigation/StackNavigator";

//Reducer
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./ reducers/user";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
const reducers = combineReducers({ user });
const persistConfig = { key: "Vehicost", storage };
const persistor = persistStore(store);

//Fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { fontStyles } from "./styles/fontsStyle";

//Style
import { gColor } from "./styles/variablesCSS";

// Store
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default function App() {
  //NavigationBAr (Android)
  NavigationBar.setBackgroundColorAsync(gColor.mainColor);

  //Fonts
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
      <PersistGate persistor={persistor}>
        <StatusBar
          backgroundColor={gColor.mainColor}
          style="light"
          StatusBarStyle={"light"}
          animated={true}
          StatusBarAnimation={"slide"}
        />
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
