import React from "react";
import {KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet} from "react-native";
import {Avatar, Button, Card, TextInput} from "react-native-paper";
import {cognitoPool} from "../util/auth";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../redux/app"

export default function Login() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.app.token);
    const navigation = useNavigation();

    if (token) {
        navigation.navigate("Home")
    }

    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    return <SafeAreaView style={{backgroundColor: '#fff', width: "100%"}}>
        <KeyboardAvoidingView behavior="position">
            <ScrollView>
                <Card style={styles.container}>
                    <Avatar.Image size={100} style={styles.icon} source={require('../assets/icon.png')}/>
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
                        <Button icon="login" mode="contained" style={styles.control} onPress={() => tryLogin(dispatch, userName, password)}>
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

function tryLogin(dispatch, userName: string, password: string) {
    dispatch(actions.loginStart())
    const user = new CognitoUser({Username: userName, Pool: cognitoPool});
    const authDetails = new AuthenticationDetails({Username: userName, Password: password});
    user.authenticateUser(authDetails, {
        onSuccess: (result) => {
            const payload = {
                token: result.getIdToken().getJwtToken(),
                refreshToken: result.getRefreshToken().getToken(),
            }
            dispatch(actions.loginSuccess(payload));
        },
        onFailure: (err) => {
            dispatch(actions.loginFailure())
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
