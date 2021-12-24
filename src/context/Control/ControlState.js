import React, { useState, useEffect, useContext } from "react";
import UserContext from "../User/UserContext";
import ControlContext from './ControlContext';
import { getArduinoControl, postControl } from '../../API/index';

const ControlState = (props) => {

  let user = useContext(UserContext);
  let [switchStates, setSwitchStates] = useState({
    led1: false,
    led2: false,
    led3: false,
    led4: false
  });

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getArduinoControl({ APIkey: user?.APIkey });
        console.log(res.data);
        setSwitchStates(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    user && f();
  }, [user]);

  const handleChange = (e) => {

    const f = async () => {
      try {
        const formData = {
          APIkey: user?.APIkey,
          userId: user?.userId,
          userName: user?.name,
          controlName: e.target.name,
          controlType: e.target.checked
        };
        console.log(formData);
        const res = await postControl(formData);
        console.log(res.data);
        setSwitchStates(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    user && f();
  }

  return (
    <ControlContext.Provider value={{ switchStates, handleChange }}>
      {props.children}
    </ControlContext.Provider >
  )
}

export default ControlState;
