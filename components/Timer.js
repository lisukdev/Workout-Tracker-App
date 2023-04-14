import {useRef, useState, useCallback} from "react";
import {Button, Text, View} from "react-native";
import TimerDisplay from "./TimerDisplay";

export default function Timer() {
    const [startTimestamp, setStartTimestamp] = useState(null);
    const [time, setTime] = useState(0);
    const timer = useRef(null);

    const onStartStop = useCallback(() => {
        if (startTimestamp === null) {
            const localStartTimestamp = Date.now();
            setStartTimestamp(localStartTimestamp);
            const interval = setInterval(() => {
                Date.now();
                setTime(time => Date.now() - localStartTimestamp);
            }, 500);
            timer.current = interval;
        } else {
            clearInterval(timer.current);
            setStartTimestamp(null);
        }
    }, [startTimestamp]);

    return <View>
        <TimerDisplay timeInMilliseconds={time} />
        <Button title={startTimestamp !== null ? "Stop" : "Start"} onPress={onStartStop} />
    </View>
}
