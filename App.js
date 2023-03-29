import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Workout from "./components/Workout";
import {ExampleWorkout} from "./data/TestData";

export default function App() {
    const {name, notes, exercises} = ExampleWorkout;
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Workout name={name} notes={notes} exercises={exercises}/>
    </View>
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
