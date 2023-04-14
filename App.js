import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from "react-redux";

import {ExampleWorkout} from "./data/TestData";
import {store} from "./redux/store";

import Workout from "./components/Workout";

export default function App() {
    const {name, notes, exercises} = ExampleWorkout;
  return (
      <Provider store={store}>
          <SafeAreaView style={styles.container}>
              <StatusBar style="auto" />
              <Workout name={name} notes={notes} exercises={exercises}/>
          </SafeAreaView>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      width: "100%",
  },
});
