import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";

import BadgerLoginContext from '../BadgerLoginContext';

function BadgerConversionScreen(props) {
    const {user, logout, reg} = useContext(BadgerLoginContext);
    const register = reg;

    return <View style={styles.container}>
        <Text style={{fontSize: 24, marginTop: -100}}>Ready to signup?</Text>
        <Text>Join BadgerChat to be able to make posts!</Text>
        <Text/>
        <Button title="Signup!" color="darkred" onPress={() => register()}/>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerConversionScreen;