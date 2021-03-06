import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {

  let [user, setUser] = useState(null);
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user'))?.user;
    setUser(u);
  }, []);
  // useEffect(() => {
  //   setUser({
  //     _id: '61bf466315f82f41e36d1629',
  //     APIkey: '61bf7d0ac38bacc0bfd0970c',
  //     name: 'Debendu',
  //     email: 'debendu@gmail.com',
  //     password: 'debendu',
  //     phno: 9876543210,
  //     userType: 'master',
  //     createdAt: '2021-12-19T14:49:07.807Z',
  //     updatedAt: '2021-12-19T14:49:07.807Z',
  //     __v: 0
  //   });
  // }, []);

  useEffect(() => {
    user && console.log('USER ', user);
  }, [user]);

  // const fetchUser = (userDetails) => {
  //   console.log("fetchUser", userDetails);
  //   setUser(userDetails);
  // }

  // setTimeout(() => {
  //   setUser({ message: 'LOL' })
  // }, 10000);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider >
  )
}

export default UserState;
