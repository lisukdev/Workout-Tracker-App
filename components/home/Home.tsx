import {ScrollView} from "react-native";
import {Avatar, Banner, Button, Card, IconButton, List, Text} from 'react-native-paper';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {actions} from "../../redux/activeWorkout";
import {ExampleWorkout} from "../../data/TestData";

export default function Home({ navigation }) {
    return (
        <ScrollView style={{paddingHorizontal: 10}}>
            <ActiveWorkout />
            <Inbox />
            <Workouts />
        </ScrollView>
    );
}

const ActiveWorkout = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const activeWorkout = useSelector(state => state.activeWorkout.workoutMetadata);

    return (
        <Banner
            style={{marginTop: 10}}
            visible={activeWorkout !== null}
            actions={[
                {
                    label: 'Abandon',
                    icon: 'cancel',
                    onPress: () => {dispatch(actions.abandonWorkout())},
                },
                {
                    label: 'Resume',
                    icon: 'play',
                    mode: 'contained-tonal',
                    onPress: () => navigation.navigate("Workout"),
                },
            ]}
            icon='sync'
            >
            You currently have an active workout "Competive Program week 1 Day 1" started Today. Would you like to resume it?
        </Banner>
    );
};


function Inbox() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const startWorkout = () => {
        dispatch(actions.loadWorkout({workout: ExampleWorkout}))
        navigation.navigate("Workout")
    }
    return (
        <Card style={{marginTop: 10, marginBottom: 5}}>
            <Card.Title
                title={<Text variant="titleLarge">Assigned Workouts</Text>}
                left={(props) => <Avatar.Icon {...props} icon="inbox" />}
                right={(props) => <IconButton {...props} icon="dots-vertical" />} />
            <Card.Content>
                <List.Item title="Competitive Program Week 2 Day 1" description="Sent by Paulie on March 28th due April 16th" onPress={startWorkout}/>
                <List.Item title="Competitive Program Week 2 Day 2" description="Sent by Paulie on March 28th due April 16th" onPress={startWorkout}/>
                <List.Item title="Competitive Program Week 2 Day 3" description="Sent by Paulie on March 28th due April 16th" onPress={startWorkout}/>
                <List.Item title="Competitive Program Week 2 Day 4" description="Sent by Paulie on March 28th due April 16th" onPress={startWorkout}/>
            </Card.Content>
        </Card>
    )
}

function Workouts() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const startWorkout = () => {
        dispatch(actions.loadWorkout({workout: ExampleWorkout}))
        navigation.navigate("Workout")
    }
    return (
        <Card style={{marginVertical: 5}}>
            <Card.Title
                title={<Text variant="titleLarge">My Workouts</Text>}
                left={(props) => <Avatar.Icon {...props} icon="inbox" />}
                right={(props) => <IconButton {...props} icon="dots-vertical" />} />
            <Card.Content>
                <List.Item title="Lega Day" description="Sent by Paulie on March 28th due April 16th" onPress={startWorkout}/>
                <List.Item title="Upper Body Day" description="Sent by Paulie on March 28th due April 16th" onPress={startWorkout}/>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained-tonal" icon="plus">Create New</Button>
            </Card.Actions>
        </Card>
    )
}
