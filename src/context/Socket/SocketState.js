import React, { useState, useEffect, useContext } from "react";
import SocketContext from "./SocketContext";
import UserContext from './../User/UserContext';
import io from "socket.io-client";

var socket;
// const ENDPOINT = "http://localhost:5000/";
const ENDPOINT = "https://car-x-backend.herokuapp.com/";

const SocketState = (props) => {


  let { user } = useContext(UserContext);

  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    // console.log("socketConnected: ", socketConnected);
    const f = () => {
      socket = io(ENDPOINT, { transports: ['websocket'] });
      socket.emit("setup", user);
      socket.on("connected", (room) => {
        console.log("Socket.io Connected to room :", room);
        setSocketConnected(true)
      });
      socket.on("test message", (message) => {
        console.log("message! :", message);
      });
    }
    user && f();
  }, [user]);

  useEffect(() => {
    socketConnected && console.log('SOCKET CONNECTED: ', socketConnected);
  }, [socketConnected])


  // setTimeout(() => {
  //   setUser({ message: 'LOL' })
  // }, 10000);
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider >
  )
}

export default SocketState;
