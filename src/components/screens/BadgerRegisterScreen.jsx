import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <Text style={{ fontSize: 18, color: "darkgray" }}>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={e=>setUsername(e)}/>
        <Text style={{ fontSize: 18, color: "darkgray" }}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={e=>setPassword(e)} secureTextEntry={true}/>
        <Text style={{ fontSize: 18, color: "darkgray" }}>Confirm Password</Text>
        <TextInput style={styles.input} value={cPassword} onChangeText={e=>setCPassword(e)} secureTextEntry={true}/>
        {
            (props.msg === "")?
            <></>
            :
            <Text style={{color: "red", marginBottom: 15}}>{props.msg}</Text>
        }
        <Button color="crimson" title="Signup" onPress={() => {
            props.handleSignup(username, password, cPassword);
            setUsername("");
            setPassword("");
            setCPassword("");
            }} />
        <Text></Text>
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;