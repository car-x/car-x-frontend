import React, { useContext, useEffect, useState } from "react";
import { getDatas } from "../../API";
import UserContext from "../User/UserContext";
import DataContext from "./DataContext";

const DataState = (props) => {

  let [data, setData] = useState([]);
  console.log(data);
  let user = useContext(UserContext);
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
  return (
    <DataContext.Provider value={data}>
      {props.children}
    </DataContext.Provider >
  )
}

export default DataState;
