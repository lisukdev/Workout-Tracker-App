import {Text, View} from "react-native";
import TimerDisplay from "./TimerDisplay";
import {useCallback, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";

export default function RestTime({setId, nextSetId, targetRestTime}) {
    const restStartTimestamp = useSelector(state => state.workout.setData[setId].achievedTimestamp);
    const restEndTimestamp = useSelector(state => state.workout.setData[nextSetId].achievedTimestamp);
    const [restTime, setRestTime] = useState(null);

    useEffect(() => {
        if (restStartTimestamp !== undefined && restEndTimestamp === undefined) {
            const interval = setInterval(() => {
                if (restStartTimestamp !== undefined && restEndTimestamp !== undefined) {
                } else if (restStartTimestamp !== undefined) {
                    setRestTime(Date.now() - restStartTimestamp);
                }
            }, 100);
            return () => clearInterval(interval);
        } else if(restStartTimestamp !== undefined && restEndTimestamp !== undefined) {
            setRestTime(restEndTimestamp - restStartTimestamp);
        }
    }, [restStartTimestamp, restEndTimestamp, restTime])

    return <View style={{flexDirection: "row", justifyContent:"space-around"}}>
            <TimerDisplay seconds={targetRestTime}/>
            {
                restTime === null
                    ? <Text>Not started</Text>
                    : <TimerDisplay seconds={Math.floor(restTime/1000)}/>
            }
    </View>
}
