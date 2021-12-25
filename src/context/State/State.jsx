import React from 'react';
import ThemeState from '../Theme/ThemeState';
import UserState from '../User/UserState';
import DataState from './../Data/DataState';
import ControlState from './../Control/ControlState';
import NotificationState from './../Notification/NotificationState';
import SocketState from './../Socket/SocketState';

const State = (props) => {
  return (
      <ThemeState>
        <UserState>
          <SocketState>
            <DataState>
                <ControlState>
                  <NotificationState>
                    {props.children}
                  </NotificationState>
                </ControlState>
            </DataState>
          </SocketState>
        </UserState>
      </ThemeState>
  )
}

export default State;
