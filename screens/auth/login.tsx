import React from "react";
import {KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet} from "react-native";
import {ActivityIndicator, Avatar, Button, Card, Modal, Portal, Text, TextInput} from "react-native-paper";
import {cognitoPool} from "../../util/auth";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {loginFailure, loginStart, loginSuccess, startLogin, suceedLogin} from "../../redux/app/action";

export default function Login() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    return <SafeAreaView style={{backgroundColor: '#fff', width: "100%"}}>
        <KeyboardAvoidingView behavior="position">

                <ScrollView>
                <Card style={styles.container}>
                    <Avatar.Image size={100} style={styles.icon} source={require('../../assets/icon.png')}/>
                    <Card.Content>
                        <TextInput
                            label="Email"
                            value={userName}
                            style={styles.control}
                            onChangeText={text => setUserName(text)}
                        />
                        <TextInput
                            label="Password"
                            secureTextEntry={true}
                            value={password}
                            style={styles.control}
                            onChangeText={text => setPassword(text)}
                        />
                        <Button icon="login" mode="contained" style={styles.control} onPress={() => tryLogin(dispatch, navigation, userName, password)}>
                            Login
                        </Button>
                        <Button icon="account-plus" mode="contained-tonal" disabled={true} style={styles.control} onPress={() => console.log('Pressed')}>
                            Register
                        </Button>
                    </Card.Content>
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
}

function tryLogin(dispatch, navigation, userName: string, password: string) {
    dispatch(loginStart())
    const user = new CognitoUser({Username: userName, Pool: cognitoPool});
    const authDetails = new AuthenticationDetails({Username: userName, Password: password});
    user.authenticateUser(authDetails, {
        onSuccess: (result) => {
            navigation.navigate("Home")
            dispatch(loginSuccess(result))
        },
        onFailure: (err) => {
            dispatch(loginFailure(err))
            console.log(err)
        },
    });
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 5,
    },
    icon: {
        alignItems: "center",
        alignSelf: "center",
    },
    control: {
        marginTop: 10,
        alignSelf: "center",
        width: "100%"
    }
})