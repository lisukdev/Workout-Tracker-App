import {ScrollView} from "react-native";
import {ActivityIndicator, Avatar, Banner, Button, Card, IconButton, List, Text} from 'react-native-paper';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {actions} from "../redux/activeWorkout";
import {ExampleWorkout} from "../data/TestData";
import {useGetLibraryByTemplateIdQuery, useGetLibraryQuery} from "../redux/platesApi";

export default function Home({ navigation }) {
    return (
        <ScrollView style={{paddingHorizontal: 10}}>
            <ActiveWorkout />
            <WorkoutTemplateList />
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
            visible={activeWorkout}
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


function WorkoutTemplateList() {
    const {data, error, isLoading} = useGetLibraryQuery();
    const safeData = data ?? [];
    console.log(isLoading, safeData, error)
    return (
        <Card style={{marginVertical: 5}}>
            <Card.Title
                title={<Text variant="titleLarge">Workout Library</Text>}
                left={(props) => <Avatar.Icon {...props} icon="inbox" />}
                right={(props) => <IconButton {...props} icon="dots-vertical" />} />
            <Card.Content>
                {isLoading ? <ActivityIndicator /> : null}
                {safeData.map((item) => <WorkoutTemplateListItem template={item} />)}
            </Card.Content>
            <Card.Actions>
                <Button mode="contained-tonal" icon="plus">Create New</Button>
            </Card.Actions>
        </Card>
    )
}


function WorkoutTemplateListItem({template}) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {data, error, isLoading} = useGetLibraryByTemplateIdQuery({templateId: template.id})

    const startWorkout = () => {
        dispatch(actions.loadWorkout({workout: data}))
        navigation.navigate("Workout")
    }

    console.log(template)
    console.log(data)
    return isLoading
        ? <ActivityIndicator size="small"/>
        : <List.Item title={template.name} description={template.id} onPress={startWorkout} />
}
