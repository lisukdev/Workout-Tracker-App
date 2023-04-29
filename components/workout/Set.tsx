import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import StructuredTextEdit from "../shared/StructuredTextEdit";
import {ACHIEVED_REGEX_PREFIX, TARGET_REGEX_PREFIX} from "../../data/ExerciseSets";
import {actions} from "../../redux/activeWorkout";
import React from "react";

export default function Set({id, prevSetId, nextSetId}) {
    const dispatch = useDispatch();

    const {target, achieved} = useSelector(state => state.activeWorkout.setData[id]);

    return (
        <View style={styles.setRow}>
            <StructuredTextEdit
                id={id + "-target"}
                style={styles.textBox}
                value={target}
                validationRegex={TARGET_REGEX_PREFIX}
                extraKeys={[
                    {value:"R", label:"RPE"},
                    {value:"X", label:"X"},
                    {value:"%", label:"%"},
                    {value:"K", label:"Kg"},
                    {value:"L", label:"Lb"},
                    {value:"-", label:"-"},
                    {value:"+", label:"+"},
                ]}
                valueFormatter={(value) => value
                    .replaceAll("R", "RPE")
                    .replaceAll("X+", "AMRAP")
                    .replaceAll("X", " x ")
                    .replaceAll("K", "Kg")
                    .replaceAll("L", "Lb")
                }
                onAcceptedValue={(newValue) => dispatch(actions.setTarget({id: id, target: newValue}))}
            />
            <StructuredTextEdit
                id={id + "-achieved"}
                style={styles.textBox}
                value={achieved}
                validationRegex={ACHIEVED_REGEX_PREFIX}
                valueFormatter={(value) => value
                    .replaceAll("X", " x ")
                    .replaceAll("+", "👍")
                    .replaceAll("-", "👎")
                    .replaceAll("K", "Kg")
                    .replaceAll("L", "Lb")
            }
                extraKeys={[
                    {value:"X", label:"X"},
                    {value:"K", label:"Kg"},
                    {value:"L", label:"Lb"},
                    {value:"+", label:"👍"},
                    {value: "-", label:"👎"},
                ]}
                onAcceptedValue={(newValue) => dispatch(actions.setAchieved({id: id, achieved: newValue}))}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    setRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#eee",
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    textBox: {
        fontSize: 16,
        width: 150,
        textAlign: "center",
        paddingVertical: 7.5,
        marginHorizontal: 5,
    },
})