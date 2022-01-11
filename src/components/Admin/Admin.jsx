import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import Routes from './Routes/Routes'
import {
  Dashboard as Dash,
  Group,
  ManageAccounts,
  // Sensors,
} from '@mui/icons-material'

const Admin = () => {
  // This routes will proped in Navbar and create navlinks accordingly
  const [routes] = useState([
    {
      name: 'Dashboard',
      path: '/',
      icon: <Dash />,
    },
    // {
    //   name: 'Sensor 1',
    //   path: '/sensor1',
    //   icon: ''
    // },
    // {
    //   name: 'Sensor 2',
    //   path: '/sensor2',
    //   icon: ''
    // },
    {
      name: 'Sensors',
      sensors: [
        {
          name: 'Temperature',
          title: 'Temperature Sensor',
          path: '/temperature',
          icon: '',
          headCells: [
            {
              name: 'time',
              label: 'Time',
            },
            {
              name: 'temp',
              label: 'Temperature',
            },
          ],
        },
        {
          name: 'Speed',
          title: 'Speed Sensor',
          path: '/speed',
          icon: '',
          headCells: [
            {
              name: 'time',
              label: 'Time',
            },
            {
              name: 'speed',
              label: 'Speed',
            },
          ],
        },
      ],
      tableHeadCells: [
        {
          name: 'time',
          label: 'Time',
        },
        {
          name: 'temp',
          label: 'Temperature',
        },
        {
          name: 'speed',
          label: 'Speed',
        },
      ],
    },
    {
      name: 'Divider',
      path: null,
      icon: null,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <ManageAccounts />,
    },
    {
      name: 'Accounts',
      path: '/accounts',
      icon: <Group />,
    },
  ])
  const [controls] = useState([
    {
      heading: 'LED 1',
      name: 'led1',
      details:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, expedita omnis quam dolor voluptatem alias tenetur tempora dicta. Excepturi qui delectus perspiciatis harum aliquam nemo!',
    },
    {
      heading: 'LED 2',
      name: 'led2',
      details:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, expedita omnis quam dolor voluptatem alias tenetur tempora dicta. Excepturi qui delectus perspiciatis harum aliquam nemo!',
    },
    {
      heading: 'LED 3',
      name: 'led3',
      details:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, expedita omnis quam dolor voluptatem alias tenetur tempora dicta. Excepturi qui delectus perspiciatis harum aliquam nemo!',
    },
    {
      heading: 'LED 4',
      name: 'led4',
      details:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, expedita omnis quam dolor voluptatem alias tenetur tempora dicta. Excepturi qui delectus perspiciatis harum aliquam nemo!',
    },
  ])

  return (
    <>
      <Navbar routes={routes} />
      <Routes routes={routes} controls={controls} />
    </>
  )
}

export default Admin
