import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Provider} from "react-redux";

import {store} from "./redux/store";

import Workout from "./components/workout/Workout";

export default function App() {
    const Stack = createStackNavigator();
  return (
      <Provider store={store}>
          <StatusBar style="auto" />
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Details" component={Details} />
                  <Stack.Screen name="Workout" component={Workout} />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      width: "100%",
  },
});

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button
                title="Show me the Details screen"
                onPress={() => navigation.navigate('Details')}
            />
            <Button
                title="Show me the Workout screen"
                onPress={() => navigation.navigate('Workout')}
            />
        </View>
    );
}

function Details({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is the Details page</Text>
            <Button
                title="Back to the Home Screen"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Show me the Workout screen"
                onPress={() => navigation.navigate('Workout')}
            />
        </View>
    );
}
