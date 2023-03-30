import {StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import StructuredTextEdit from "./StructuredTextEdit";
import {updateTarget, updateAchieved} from "../redux/workout/action";

export default function Set({id}){
    const {target, achieved} = useSelector(state => state.workout.setData[id]);
    const dispatch = useDispatch();
    return (
        <View style={[styles.setRow]}>
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
                    .replaceAll("X", " X ")
                    .replaceAll("K", "Kg")
                    .replaceAll("L", "Lb")
                }
                onAcceptedValue={(newValue) => dispatch(updateTarget(id, newValue))}
            />
            <StructuredTextEdit
                id={id + "-achieved"}
                style={styles.textBox}
                value={achieved}
                validationRegex={ACHIEVED_REGEX_PREFIX}
                valueFormatter={(value) => value
                    .replaceAll("X", " X ")
                    .replaceAll("+", "👍")
                    .replaceAll("-", "👎")
                    .replaceAll("K", "KG")
                    .replaceAll("L", "LB")
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