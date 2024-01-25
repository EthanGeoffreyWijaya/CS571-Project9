import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from 'react';

function BadgerLoginScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36, marginBottom: 10 }}>BadgerChat Login</Text>
        <Text style={{ fontSize: 18, color: "darkgray" }}>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={e=>setUsername(e)}/>
        <Text style={{ fontSize: 18, color: "darkgray" }}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={e=>setPassword(e)} secureTextEntry={true}/>
        {
            (props.msg === "")?
            <></>
            :
            <Text style={{color: "red", marginBottom: 15}}>{props.msg}</Text>
        }
        <Button color="crimson" title="Login" onPress={() => {
            props.handleLogin(username, password);
            setUsername("");
            setPassword("");
            }} />
        <Text style={{margin: 30}}>New Here?</Text>
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
        <Text></Text>
        <Button color="grey" title="Continue as Guest" onPress={() => props.guest(true)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 35,
        width: 300,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginBottom: 25
    }
});

export default BadgerLoginScreen;