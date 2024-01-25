import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLoginContext from './BadgerLoginContext';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerConversionScreen from './screens/BadgerConversionScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [regErrorMsg, setRegErrorMsg] = useState("");
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    fetch(`https://cs571.org/api/f23/hw9/chatrooms`, {
      method: "GET",
      headers: {
        "X-CS571-ID": "bid_a097df77e7e0bc0c1641a3a7d5135d16e0a923442e4048efe0532f0d0dd65c85",
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => setChatrooms(data))
  }, []);

  function handleLogin(username, password) {
    if (username === "" || password === "") {
      setLoginErrorMsg("You must include a username and a password!");
      return;
    }
    fetch('https://cs571.org/api/f23/hw9/login', {
      method: 'POST',
      headers: {
          "X-CS571-ID": "bid_a097df77e7e0bc0c1641a3a7d5135d16e0a923442e4048efe0532f0d0dd65c85",
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "username":username,
          "password":password
      })
    })
    .then(res => {
      if (res.status === 401) {
        setLoginErrorMsg("Incorrect login information, please try again.");
        return 0;
      } else if (res.status === 200) {
        return res.json();
      }
    })
    .then(data => {
      if (data !== 0) {
        SecureStore.setItemAsync("token", data.token)
        .then(() => {
          setIsLoggedIn(true);
          setLoginErrorMsg("");
          setUser(username);
        })
      }
    })
  }

  function handleSignup(username, password, cPassword) {
    if (username === "" || password === "") {
      setRegErrorMsg("You must include a username and a password!");
      return;
    }
    if (password != cPassword) {
      setRegErrorMsg("Your passwords do not match!");
      return;
    }
    fetch(`https://cs571.org/api/f23/hw9/register`, {
      method: 'POST',
      headers:{
        "X-CS571-ID": "bid_a097df77e7e0bc0c1641a3a7d5135d16e0a923442e4048efe0532f0d0dd65c85",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username":username,
        "password":password
      })
    })
    .then(res => {
      if (res.status === 409) {
        setRegErrorMsg("This username is already taken!");
        return 0;
      } else if (res.status === 200) {
        return res.json();
      }
    })
    .then(data => {
      if (data !== 0) {
        SecureStore.setItemAsync("token", data.token)
        .then(() => {
          setIsLoggedIn(true);
          setRegErrorMsg("");
          setUser(username);
        })
      }
    })
  }

  function convert() {
    setIsLoggedIn(false);
    setIsRegistering(true);
  }

  function logout() {
    SecureStore.deleteItemAsync("token")
    .then(() => {
      setIsLoggedIn(false);
      setUser("");
    })
  }

  if (isLoggedIn) {
    return (
      <BadgerLoginContext.Provider value={{user:user, logout: logout, reg:convert}}>
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom}/>}
              </ChatDrawer.Screen>
            })
          }
          {
            (user==="")?
            <ChatDrawer.Screen name="Sign up" component={BadgerConversionScreen}/>
            :
            <ChatDrawer.Screen name="Log out" component={BadgerLogoutScreen}/>
          }
        </ChatDrawer.Navigator>
      </NavigationContainer>
      </BadgerLoginContext.Provider>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} msg={regErrorMsg}/>
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} guest={setIsLoggedIn} msg={loginErrorMsg}/>
  }
}