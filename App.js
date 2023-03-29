import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import {Provider} from "react-redux";

import {ExampleWorkout} from "./data/TestData";
import {store} from "./redux/store";

import Workout from "./components/Workout";

export default function App() {
    const {name, notes, exercises} = ExampleWorkout;
  return (
      <Provider store={store}>
          <View style={styles.container}>
              <StatusBar style="auto" />
              <Workout name={name} notes={notes} exercises={exercises}/>
          </View>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 25,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
  },
});
