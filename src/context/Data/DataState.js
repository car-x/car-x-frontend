import React, { useContext, useEffect, useState } from "react";
import { getDatas } from "../../API";
import UserContext from "../User/UserContext";
import DataContext from "./DataContext";
import SocketContext from './../Socket/SocketContext';

const DataState = (props) => {

  let [data, setData] = useState([]);
  let { user } = useContext(UserContext);
  let socket = useContext(SocketContext);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getDatas({ APIkey: user?.APIkey });
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    user && f();
  }, [user])

  useEffect(() => {
    const f = async () => {
      socket?.on("new data", (newData) => {
        console.log("newData from Socket.io :", newData);
        setData(data => [...data, newData]);
      });
    }
    user && f();
  }, [user, socket]);

  useEffect(() => {
    data.length > 0 && console.log('DATA: ', data);
  }, [data]);

  return (
    <DataContext.Provider value={data}>
      {props.children}
    </DataContext.Provider >
  )
}

export default DataState;
