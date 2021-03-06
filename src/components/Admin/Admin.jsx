import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import Routes from './Routes/Routes'
import {
  Dashboard as Dash,
  Group,
  AppSettingsAlt,
  ManageAccounts,
  Compare,
  PersonPinCircle,
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
      ],
    },
    {
      name: 'Advanced View',
      path: '/advanced',
      icon: <Compare />,
    },
    {
      name: 'Map',
      path: '/map',
      icon: <PersonPinCircle />,
    },
    {
      name: 'Controls',
      path: '/controls',
      icon: <AppSettingsAlt />,
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
      type: 'button',
      details:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, voluptatem?',
    },
    {
      heading: 'LED 2',
      name: 'led2',
      type: 'button',
      details:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, voluptatem?',
    },
    {
      heading: 'LED 3',
      name: 'led3',
      type: 'button',
      details:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, voluptatem?',
    },
    {
      heading: 'Servo Motor',
      name: 'sm1',
      type: 'slider',
      details:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, voluptatem?',
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
