import React from 'react';
import ThemeState from '../Theme/ThemeState';
import UserState from '../User/UserState';
import DataState from './../Data/DataState';

const State = (props) => {
  return (
      <ThemeState>
        <UserState>
          <DataState>
            {props.children}
          </DataState>
        </UserState>
      </ThemeState>
  )
}

export default State;
