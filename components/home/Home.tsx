import {Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React from "react";

export default function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Button
                    title="Show me the Workout screen"
                    onPress={() => navigation.navigate('Workout')}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: "100%",
    },
});
