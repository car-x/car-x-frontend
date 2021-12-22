import React from 'react';
import ThemeState from '../Theme/ThemeState';
import UserState from '../User/UserState';
import DataState from './../Data/DataState';
import ControlState from './../Control/ControlState';

const State = (props) => {
  return (
      <ThemeState>
        <UserState>
          <DataState>
            <ControlState>
              {props.children}
            </ControlState>
          </DataState>
        </UserState>
      </ThemeState>
  )
}

export default State;
