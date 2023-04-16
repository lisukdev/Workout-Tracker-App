import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import {Provider} from "react-redux";

import {store} from "./redux/store";

import Home from "./components/home/Home";
import Workout from "./components/workout/Workout";

export default function App() {
    const Stack = createStackNavigator();
  return (
      <Provider store={store}>
          <StatusBar style="auto" />
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                  <Stack.Screen name="Workout" component={Workout} />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
}