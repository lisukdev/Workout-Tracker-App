import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import StructuredTextEdit from "./StructuredTextEdit";
import {updateTarget, updateAchieved} from "../redux/activeWorkout/action";
import {ACHIEVED_REGEX_PREFIX, TARGET_REGEX_PREFIX} from "../data/ExerciseSets";

export default function Set({id, prevSetId, nextSetId}) {
    const {target, achieved} = useSelector(state => state.activeWorkout.setData[id]);
    const {targetRef, achievedRef} = useSelector(state => state.activeWorkout.setReferences[id]);
    const prevRefs = useSelector(state => state.activeWorkout.setReferences[prevSetId]);
    const nextRefs = useSelector(state => state.activeWorkout.setReferences[nextSetId]);
    const dispatch = useDispatch();
    return (
        <View style={styles.setRow}>
            <StructuredTextEdit
                id={id + "-target"}
                textInputRef={targetRef}
                style={styles.textBox}
                value={target}
                validationRegex={TARGET_REGEX_PREFIX}
                onPressPrev={() => {if (prevRefs) {prevRefs.targetRef.current.focus()}}}
                onPressNext={() => {if (nextRefs) {nextRefs.targetRef.current.focus()}}}
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
                onAcceptedValue={(newValue) => dispatch(updateTarget(id, newValue))}
            />
            <StructuredTextEdit
                id={id + "-achieved"}
                textInputRef={achievedRef}
                onPressPrev={() => {if (prevRefs) {prevRefs.achievedRef.current.focus()}}}
                onPressNext={() => {if (nextRefs) {nextRefs.achievedRef.current.focus()}}}
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
                onAcceptedValue={(newValue) => dispatch(updateAchieved(id, newValue))}
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