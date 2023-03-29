import {Button, InputAccessoryView, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAchieved} from "../redux/workout/action";

export default function Set({data, active, onAchieved}) {
    const {id, reps, load} = data;
    const dispatch = useDispatch();
    const achieved = useSelector(state => state.workout.achievedSets[data.id]);
    return (
        <View style={[styles.container, active ? styles.active : null]}>
            <View style={styles.targetContainer}>
                <TargetRep reps={reps} />
                <TargetLoad load={load.targetLoad} />
            </View>
            <View style={styles.achievedContainer}>
                <Pressable onPress={() => dispatch(setAchieved(id, 5, {value:5, unit: "KG"}))}>
                    {achieved != null
                        ? <AchievedLoad id={data.id} achievedReps={achieved.reps} load={achieved.load} />
                        : <Text>Todo</Text>
                    }
                </Pressable>
            </View>
        </View>
    );
}

function TargetRep({reps: {targetRepsLowerBound, targetRepsUpperBound, asManyAsPossible}}) {
    return <Text>
        {targetRepsLowerBound}
        {targetRepsUpperBound ? " - " + targetRepsUpperBound : null}
        {asManyAsPossible ? "+": ""}
    </Text>
}

function TargetLoad({load: {scheme, percentage, rpe, weight}}) {
    switch(scheme) {
        case "RPE":
            return (<Text>@RPE{rpe.toFixed(1)}</Text>);
        case "PERCENTAGE":
            return (<Text>@{(percentage*100).toFixed(0)}%</Text>);
        case "WEIGHT":
            return (<Text>x{weight.value.toFixed(0)}{weight.unit}</Text>);
        default:
            return null
    }
    return (
        <View>
            <Text>{targetLoad.scheme}</Text>
            <Text>{targetLoad.percentage}</Text>
            <Text>{targetLoad.rpe}</Text>
            <Text>{targetLoad.weight}</Text>
        </View>
    );
}

function AchievedLoad({id, achievedReps , load: {value, unit}}) {
    const ref_reps = useRef();
    return (
        <View style={{flexDirection: "row"}}>
            <TextInput returnKeyType="done" keyboardType="number-pad" inputAccessoryViewID={id} onSubmitEditing={() => ref_reps.current.focus()} />
            <Text>X</Text>
            <TextInput returnKeyType="done" inputMode="numeric" ref={ref_reps} />
            <Text>{unit}</Text>
            <InputAccessoryView nativeID={id} style={{bottom:100}} backgroundColor="#ccc" >
                <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
                <Button title="X"/>
                <Button title="Good"/>
                </View>
            </InputAccessoryView>
        </View>
    );
}


const styles = StyleSheet.create({
    active: {
        backgroundColor: "pink",
    },
    container: {
        width: "100%",
        paddingLeft: 25,
        paddingRight: 25,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    targetContainer: {
        flexDirection: "row",
    },
    achievedContainer: {
        flexDirection: "row",
    },
})