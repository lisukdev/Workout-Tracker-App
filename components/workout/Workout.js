import {KeyboardAvoidingView, Pressable, SafeAreaView, SectionList, StyleSheet, Text, View} from "react-native";
import Set from "./Set";
import {HeaderText, NoteText, TitleText} from "../shared/Text";
import IconButton from "../shared/IconButton";
import Button from "../shared/Button";
import {useDispatch, useSelector} from "react-redux";
import {finishWorkout, loadWorkout} from "../../redux/activeWorkout/action";
import RestTime from "./RestTime";
import React from "react";

export default function Workout() {
    const dispatch = useDispatch();
    const workoutData = useSelector(state => state.activeWorkout.workoutData);
    const metadata = useSelector(state => state.activeWorkout.workoutMetadata);
    if (workoutData == null) {
        return <View>
            <Text>No workout loaded</Text>
            <Button label="Load Workout" onPress={() => dispatch(loadWorkout(""))}/>
        </View>
    }
    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView  style={{height:"100%"}} behavior="padding">
            <View style={[styles.header, {flexDirection: "row", justifyContent: "space-between"}]}>
                <TitleText>{metadata.name}</TitleText>
                {}
                <View style={styles.headerButtons}>
                    <IconButton icon="edit" />
                    <IconButton icon="play" />
                </View>
            </View>
            <SectionList
                style={{height:500}}
                sections={workoutData}
                keyboardShouldPersistTaps={"always"}
                bounces={false}
                //keyExtractor={(item, index) => item.id}
                renderItem={({item}) => <Set {...item}/>}
                renderSectionHeader={({section}) => <ExerciseHeader {...section}/>}
                renderSectionFooter={({section}) => <View><Pressable><Text>Add Set</Text></Pressable></View>}
                ListFooterComponent={
                    <View>
                        <Button label="Finish" onPress={() => dispatch(finishWorkout(metadata.id))}/>
                    </View>
                }
                ItemSeparatorComponent={({leadingItem, section}) => <RestTime setId={leadingItem.id} targetRestTime={section.targetRestTime}/>}
            />
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

function ExerciseHeader({name, notes, tempo}) {
    return (
        <View>
            <View style={styles.header}>
                <HeaderText style={styles.headerText}>
                    {name}
                    &nbsp;
                    <Tempo tempo={tempo} />
                </HeaderText>
                {notes ? <NoteText>{notes}</NoteText> : null}
            </View>
            <View style={styles.setHeader}>
                <Text style={styles.setHeaderText}>Target</Text>
                <Text style={styles.setHeaderText}>Achieved</Text>
            </View>
        </View>
    );
}

function Tempo({tempo }) {
    if (tempo == null) {
        return null;
    }
    const parseTempoDigit = (x) => x == 0 ? "X" : x;
    return <Text>
        {parseTempoDigit(tempo.targetEccentricSeconds)}
        {parseTempoDigit(tempo.targetPauseSeconds)}
        {parseTempoDigit(tempo.targetConcentricSeconds)}
        {parseTempoDigit(tempo.targetRestSeconds)}
    </Text>
    ;
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: "100%",
    },
    header: {
        backgroundColor: "#ddd",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    headerButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 50,
    },
    subheader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    setHeader: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ddd",
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    setHeaderText: {
        fontSize: 16,
        width: 150,
        textAlign: "center",
        paddingVertical: 7.5,
        marginHorizontal: 5,
    }
})