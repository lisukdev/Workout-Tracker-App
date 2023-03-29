import {Pressable, StyleSheet, Text, View} from "react-native";
import {useState} from "react";

export default function Set({data, active, onAchieved}) {
    const {reps, load} = data;
    const [showModal, setModal] = useState(false)
    const [achieved, setAchieved] = useState(null)
    return (
        <View style={[styles.container, active ? styles.active : null]}>
            <View style={styles.targetContainer}>
                <TargetRep reps={reps} />
                <TargetLoad load={load.targetLoad} />
            </View>
            <View style={styles.achievedContainer}>
                <Pressable>
                    {load.achievedLoad != null ? <AchievedLoad achievedReps={reps.achievedReps} load={load.achievedLoad} /> : null}
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

function AchievedLoad({achievedReps , load: {value, unit}}) {
    return (
        <View>
            <Text>{achievedReps} X {value} {unit}</Text>
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