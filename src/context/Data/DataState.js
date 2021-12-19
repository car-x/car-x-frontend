import React, { useContext, useEffect, useState } from "react";
import { getDatas } from "../../API";
import userContext from "../User/UserContext";
import DataContext from "./DataContext";

const DataState = (props) => {

  let [data, setData] = useState([]);

  let user = useContext(userContext);
  useEffect(() => {
    const f = async () => {
      console.log(user);
      const res = await getDatas({ APIkey: user?.APIkey });
      // console.log("DATA: ", res);
      setData(res.data)
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
