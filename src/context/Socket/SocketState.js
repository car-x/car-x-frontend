import React, { useState, useEffect, useContext } from "react";
import SocketContext from "./SocketContext";
import UserContext from './../User/UserContext';
import io from "socket.io-client";

var socket = null;
const ENDPOINT = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : 'https://car-x-backend.herokuapp.com/';
// const ENDPOINT = "https://car-x-backend.herokuapp.com/";

const SocketState = (props) => {


  let { user } = useContext(UserContext);

  const [socketConnected, setSocketConnected] = useState(false);

  const disconnectFunction = () => {
    console.log("Socket Disconnected");
    setSocketConnected(false);
    socket.off();
  }


  useEffect(() => {
    const setupFunction = () => {
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
    // console.log("socketConnected: ", socketConnected);
    user && setupFunction();
  }, [user]);

  useEffect(() => {
    socketConnected && console.log('SOCKET CONNECTED: ', socketConnected);
  }, [socketConnected])


  // setTimeout(() => {
  //   setUser({ message: 'LOL' })
  // }, 10000);
  return (
    <SocketContext.Provider value={{ socket, disconnectFunction }}>
      {props.children}
    </SocketContext.Provider >
  )
}

export default SocketState;
