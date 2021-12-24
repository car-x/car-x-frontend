import React, { useContext, useEffect, useState } from "react";
import { getNotification } from "../../API";
import ControlContext from "../Control/ControlContext";
import UserContext from "../User/UserContext";
import NotificationContext from './NotificationContext';
const NotificationState = (props) => {

  let user = useContext(UserContext);
  let control = useContext(ControlContext);

  let [notification, setNotification] = useState([]);
  console.log(notification);

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
  }, [user])

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getNotification({ APIkey: user?.APIkey });
        setNotification(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    user && control && f();
  }, [user, control, control?.switchStates])
  return (
    <NotificationContext.Provider value={notification}>
      {props.children}
    </NotificationContext.Provider >
  )
}

export default NotificationState;
