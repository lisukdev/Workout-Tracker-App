import {Text} from "react-native";

export default function TimerDisplay({seconds, style}) {
    return <Text style={style}>
        {String(Math.floor(seconds / 60)).padStart(2, " ")}:{String(seconds % 60).padStart(2, "0")}
    </Text>
}
