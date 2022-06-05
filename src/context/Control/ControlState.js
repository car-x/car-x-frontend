import React, { useState, useEffect, useContext } from "react";
import UserContext from "../User/UserContext";
import ControlContext from './ControlContext';
import { getArduinoControl, postControl } from '../../API/index';
import SocketContext from "../Socket/SocketContext";

const ControlState = (props) => {

  let { user } = useContext(UserContext);
  let [switchStates, setSwitchStates] = useState({
    led1: false,
    led2: false,
    led3: false,
    sm1: 0
  });
  const [loading, setLoading] = useState(false)

  let { socket } = useContext(SocketContext);

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getArduinoControl({ APIkey: user?.APIkey });
        // console.log(res.data);
        setSwitchStates(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    user && f();
  }, [user]);

  useEffect(() => {
    const f = async () => {
      socket?.on("new control", (newControl) => {
        console.log("new control from Socket.io :", newControl);
        setSwitchStates((switchStates) => { return { ...switchStates, [newControl.controlName]: newControl.controlType } });
      });
    }
    user && f();
  }, [user, socket]);

  const handleChange = (e, sliderValue) => {
    console.log(e, sliderValue);

    const f = async () => {
      setLoading(true)
      try {
        let formData = {};
        if (e.target.name === 'led1' || e.target.name === 'led2' || e.target.name === 'led3' || e.target.name === 'led4') {

          formData = {
            APIkey: user?.APIkey,
            userId: user?.userId,
            userName: user?.name,
            controlName: e.target.name,
            controlType: e.target.checked
          };
        } else {
          formData = {
            APIkey: user?.APIkey,
            userId: user?.userId,
            userName: user?.name,
            controlName: 'sm1',
            controlType: sliderValue
          };
        }
        // console.log('Form Data', formData);
        await postControl(formData);

        setLoading(false)
        // console.log('postControl response ', res.data);
        // setSwitchStates(res.data);
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    user && f();
  }

  useEffect(() => {
    switchStates && console.log('CONTROL: ', switchStates);
  }, [switchStates]);

  return (
    <ControlContext.Provider value={{ switchStates, handleChange, loading }}>
      {props.children}
    </ControlContext.Provider >
  )
}

export default ControlState;
