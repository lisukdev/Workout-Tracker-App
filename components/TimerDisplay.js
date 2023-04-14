import {Text, View} from "react-native";

export default function TimerDisplay({seconds, style}) {
    const minutes = Math.floor(seconds / 60);

    return <Text style={style}>
        {String(minutes).padStart(2, " ")}:{String(seconds % 60).padStart(2, "0")}
    </Text>
}