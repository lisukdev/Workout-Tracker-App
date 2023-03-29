import {Pressable, SectionList, StyleSheet, Text, View} from "react-native";
import Set from "./Set";
import {HeaderText, NoteText, SubHeaderText, TitleText} from "./Text";
import IconButton from "./IconButton";
import Button from "./Button";
import {useState} from "react";

export default function Workout({name, notes, exercises}) {
    const [activeSet, setActiveSet] = useState(null)
    const [achieved, setAchieved] = useState({})
    const addAchieved = (id, achieved) => setAchieved({...achieved, [id]: achieved})
    return (
        <View>
            <View style={[styles.header, {flexDirection: "row", justifyContent: "space-between"}]}>
                <TitleText>{name}</TitleText>
                <View style={styles.headerButtons}>
                    <IconButton icon="edit" onPress={() => console.log("Edit")}/>
                    <IconButton icon="play" onPress={() => setActiveSet(exercises[0].data[0].id)}/>
                </View>
            </View>
            <SectionList
                sections={exercises}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => <Set data={item} active={item.id === activeSet}/>}
                renderSectionHeader={({section}) => <ExerciseHeader {...section}/>}
                // renderSectionFooter={({section}) => <View><Pressable><Text>Add Set</Text></Pressable></View>}
                ItemSeparatorComponent={({section}) => section.targetRestTime ? <View><RestTime {...section} /></View> : null}
            />
            <View>
                <Button label="Finish" onPress={() => alert(JSON.stringify(achieved))}/>
            </View>
        </View>
    );
}

function ExerciseHeader({name, notes, tempo}) {
    return (
        <View style={styles.header}>
            <HeaderText style={styles.headerText}>
                {name}
                &nbsp;
                <Tempo tempo={tempo} />
            </HeaderText>
            {notes ? <NoteText>{notes}</NoteText> : null}
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <SubHeaderText>Target</SubHeaderText>
                <SubHeaderText>Achieved</SubHeaderText>
            </View>
        </View>
    );
}

function RestTime({targetRestTime}) {
    if (targetRestTime == null) {
        return null;
    }

    return <Text>
        Rest {new Date(targetRestTime*1000).toISOString().substring(14, 19)}
    </Text>
}

function Tempo({tempo }) {
    if (tempo == null) {
        return null;
    }
    const parseTempoDigit = (x) => x == 0 ? "X" : x;
    return <Text>
        {parseTempoDigit(tempo.targetEccentricSeconds)}
        {parseTempoDigit(tempo.targetPauseSeconds)}
        {parseTempoDigit(tempo.targetConcentricSeconds)}
        {parseTempoDigit(tempo.targetRestSeconds)}
    </Text>
    ;
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "lightgrey",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    headerButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 50,
    },
    subheader: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})