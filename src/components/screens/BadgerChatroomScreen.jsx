import { StyleSheet, Text, ScrollView, View, Button, Modal, TextInput, Alert } from "react-native";
import { useContext, useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';

import BadgerChatMessage from "../helper/BadgerChatMessage";
import BadgerLoginContext from '../BadgerLoginContext';

function BadgerChatroomScreen(props) {
    const {user, logout, reg} = useContext(BadgerLoginContext);
    const username = user;

    const [page, setpage] = useState(1);
    const [messages, setMessages] = useState([]);
    const [modalShown, setModalShown] = useState(false);
    const [load, setLoad] = useState(1);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}&page=${page}`, {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_a097df77e7e0bc0c1641a3a7d5135d16e0a923442e4048efe0532f0d0dd65c85",
                "Content-Type": "application/json"
            } 
        })
        .then(res => res.json())
        .then(data => setMessages(data.messages))
    }, [props.name, page, load]);

    function post() {
        SecureStore.getItemAsync("token")
        .then(tok => {
          fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}`, {
            method: "POST",
            headers:{
              "X-CS571-ID": "bid_a097df77e7e0bc0c1641a3a7d5135d16e0a923442e4048efe0532f0d0dd65c85",
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${tok}`
            },
            body: JSON.stringify({
              "title":title,
              "content":body
            })
          })
          .then(res => {
            if (res.status === 200) {
                if (page === 1) setLoad(l => l * -1);
                setpage(1);
                setModalShown(false);
                setTitle("");
                setBody("");
                Alert.alert("Succesfully posted!");
            }
          })
        })
      }

    function deletePost(msgid) {
        SecureStore.getItemAsync("token")
        .then(tok => {
          fetch(`https://cs571.org/api/f23/hw9/messages?id=${msgid}`, {
            method: "DELETE",
            headers:{
              "X-CS571-ID": "bid_a097df77e7e0bc0c1641a3a7d5135d16e0a923442e4048efe0532f0d0dd65c85",
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${tok}`
            }
          })
          .then(res => {
            if (res.status === 200) {
                if (page === 1) setLoad(l => l * -1);
                setpage(1);
                Alert.alert("Succesfully deleted post!");
            }
          })
        })
    }

    return <>
        {
            (messages.length === 0)?
            <View style={styles.container}>
                <Text style={{fontSize: 36}}>There's nothing here!</Text>
            </View>
            :
            <ScrollView style={{ flex: 1 }}>
                {
                    messages.map((msg, i) => {
                        return <BadgerChatMessage key={i} del={deletePost} {...msg}/>
                    })
                }
            </ScrollView>
        }
        <View>
            <Text style={{fontSize: 18, alignSelf: "center", margin: 5}}>You are on page {page}</Text>
            <View style={{flexDirection : "row", justifyContent: "center", margin: 5}}>
                <Button title="Previous" disabled={page===1} onPress={()=>setpage(page => page - 1)}/>
                <Button title="Next" disabled={page===4} onPress={()=>setpage(page => page + 1)}/>
            </View>
            {
                (username === "")?
                <></>
                :
                <Button title="Add Post" color="green" onPress={()=>setModalShown(true)}/>
            }
        </View>
        <Modal visible={modalShown} transparent={true}>
            <View style={styles.modal}>
                <Text style={{fontSize: 24, marginBottom: 20}}>Create a Post</Text>
                <Text style={{fontSize: 16}}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={txt => setTitle(txt)}/>
                <Text style={{fontSize: 16}}>Body</Text>
                <TextInput style={styles.input} value={body} onChangeText={txt => setBody(txt)}/>
            <View style={{flexDirection: "row", justifyContent: "center", margin: 5}}>
                <Button title="Create Post" disabled={title==="" || body===""} onPress={()=>post()}/>
                <Text>    </Text>
                <Button title="Cancel" onPress={()=>{setModalShown(false)}}/>
            </View>
            </View>
        </Modal>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        margin: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "black",
        shadowOpacity: 0.20,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: "white",
        justifyContent: "center",
    },
    input: {
        height: 35,
        width: 280,
        borderWidth: 2,
        borderColor: 'black',
        margin: 25
    }
});

export default BadgerChatroomScreen;