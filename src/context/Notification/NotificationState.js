import React, { useContext, useEffect, useState } from "react";
import { getNotification } from "../../API";
import UserContext from "../User/UserContext";
import NotificationContext from './NotificationContext';
import SocketContext from './../Socket/SocketContext';

const NotificationState = (props) => {

  let user = useContext(UserContext);
  let socket = useContext(SocketContext);

  let [notification, setNotification] = useState(null);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getNotification({ APIkey: user?.APIkey });
        setNotification(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    user && f();
  }, [user]);

  useEffect(() => {
    const f = async () => {
      socket?.on("new notification", (newNotification) => {
        console.log("new notification from Socket.io :", newNotification);
        setNotification(notification => [newNotification, ...notification]);
      });
    }
    user && f();
  }, [user, socket]);

  useEffect(() => {
    notification && console.log('NOTIFICATION: ', notification);
  }, [notification]);


  return (
    <NotificationContext.Provider value={notification}>
      {props.children}
    </NotificationContext.Provider >
  )
}

export default NotificationState;
