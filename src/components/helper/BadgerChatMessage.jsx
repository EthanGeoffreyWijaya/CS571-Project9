import { Text, Button } from "react-native";
import { useContext } from 'react';
import BadgerCard from "./BadgerCard"

import BadgerLoginContext from '../BadgerLoginContext';

function BadgerChatMessage(props) {
    const {user, logout, reg} = useContext(BadgerLoginContext);
    const username = user;
    const dt = new Date(props.created);

    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{fontSize: 28, fontWeight: 600}}>{props.title}</Text>
        <Text style={{fontSize: 12}}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.content}</Text>
        {
            (props.poster === username)?
            <Button color="red" title="Delete" onPress={()=>props.del(props.id)}/>
            :
            <></>
        }
    </BadgerCard>
}

export default BadgerChatMessage;