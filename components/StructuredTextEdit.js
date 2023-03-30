import {
    Button,
    InputAccessoryView,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {useState} from "react";

export default function StructuredTextEdit(
    {
        id,
        style,
        value = "",
        textInputRef = null,
        validationRegex = /.*/,
        valueFormatter = (x) => x,
        extraKeys = [],
        onAcceptedValue = (v) => console.log("Accepted Value: " + v),
        onPressPrev = () => null,
        onPressNext = () => null,
    }) {
    const [isEditing, setIsEditing] = useState(false);
    const formattedValue = valueFormatter(value);
    const keyboardNativeId = id + "-keyboard";
    const onKeyPress = (pressedKey) => {
        const startingValue = value
        let newValue;
        if (pressedKey === "Backspace") {
            newValue = startingValue.substring(0, startingValue.length - 1);
        } else {
            newValue = startingValue + pressedKey;
        }
        if (validationRegex.test(newValue)) {
            onAcceptedValue(newValue);
        } else {
            console.log("Illegal value entered: " + newValue)
        }
    }

    const keys = extraKeys.map(({value, label}) =>
        <Pressable key={id + "-key-" + value} style={styles.extraKey} onPress={() => onKeyPress(value)} keyboardShouldPersistTaps={true}>
            <Text style={styles.extraKeyText}>{label}</Text>
        </Pressable>
    )
    return <View>
        <TextInput
            style={style}
            id={id + "-textinput"}
            ref={textInputRef}
            cursorColor={"red"}
            keyboardType="numeric"
            inputAccessoryViewID={keyboardNativeId}
            value={formattedValue}
            onKeyPress={(event) => onKeyPress(event.nativeEvent.key)}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
        />
        <InputAccessoryView id={keyboardNativeId} nativeID={keyboardNativeId}>
            <View style={styles.actionBar}>
                <View style={{flexDirection: "row"}}>
                    <Button id={id + '-prev'} style={styles.actionBarButton} title="Prev" onPress={onPressPrev}/>
                    <Button id={id + '-next'} style={styles.actionBarButton} title="Next" onPress={onPressNext}/>
                </View>
                <Button id={id + '-submit'} style={styles.actionBarButton} title="Submit" onPress={() => Keyboard.dismiss()}/>
            </View>
            <View style={styles.extraKeysContainer}>
                {keys}
            </View>
        </InputAccessoryView>
    </View>
}

const styles = StyleSheet.create({
    actionBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 2.5,
        paddingVertical: 5,
        backgroundColor: "#f5f5f5",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    actionBarButton: {
        marginHorizontal: 2.5,
    },
    extraKeysContainer: {
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: "#c9ccd1",
        paddingHorizontal: 2.5,
    },
    extraKey: {
        backgroundColor: "#f5f5f5",
        opacity: 1,
        color: "#0e1919",
        boxSizing: "content-box",
        width: 15,
        flexDirection:"column",
        justifyContent: "center",
        alignItems:"center",
        flexGrow: 1,
        height: 45,
        padding: 0,
        marginHorizontal: 2.5,
        marginTop: 5,
        borderRadius: 5,
    },
    extraKeyText: {
        fontSize: 20,
        fontFamily: "Helvetica",
    },
})