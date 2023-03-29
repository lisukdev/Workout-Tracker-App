import {StyleSheet, Text, View} from "react-native";

export default function Exercise({name, notes, tempo, sets, targetRestTime}) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text>{name}</Text>
            <View style={styles.timingNotes}>
                <Text>{tempo}</Text>
                <Text>{targetRestTime}</Text>
            </View>
            <View>
                <Text>{notes}</Text>
            </View>
        </View>
        <View stylie={styles.body}>{sets.map((x) => <Text>{x}</Text>)}</View>
        <View style={styles.footer}>
            <Text>Add Set</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
    },
    timingNotes: {
        flexDirection: "row",
    },
    body: {
        width: "100%",
    },
    footer: {
        width: "100%",
    },
    container: {},
})