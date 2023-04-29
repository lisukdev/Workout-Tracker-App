import React from 'react';
import {Appearance} from "react-native";
import merge from 'deepmerge';

import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Provider as StoreProvider} from "react-redux";
import {store} from "./redux/store";

import {
    Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme, Modal, ActivityIndicator, Portal,
} from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';
import CustomNavigationBar from "./components/shared/CustomNavBar";

import Home from "./components/home/Home";
import Workout from "./components/workout/Workout";
import Login from "./screens/auth/login";
import LoadingModal from "./components/loadingModal";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {
    const Stack = createStackNavigator();
    const colorScheme = Appearance.getColorScheme();
    let theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
  return (
      <StoreProvider store={store}>
          <PaperProvider theme={theme}>
              <NavigationContainer theme={theme}>
                  <LoadingModal />
                  <Stack.Navigator
                      initialRouteName="Signin"
                      screenOptions={{
                          header: (props) => <CustomNavigationBar {...props} />,
                      }}
                  >
                      <Stack.Screen name="Home" component={Home} />
                      <Stack.Screen name="Workout" component={Workout} />
                      <Stack.Screen name={"Signin"} component={Login} />
                  </Stack.Navigator>
              </NavigationContainer>
          </PaperProvider>
      </StoreProvider>
  );
}