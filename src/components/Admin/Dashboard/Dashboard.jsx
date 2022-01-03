import React, { useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { Typography, Paper, Grid, Alert } from '@mui/material'
import UserContext from './../../../context/User/UserContext'
import DataContext from './../../../context/Data/DataContext'
import ControlContext from './../../../context/Control/ControlContext'
import { useState } from 'react'
import { useEffect } from 'react'
import DashboardChart from '../ChartComponent/DashboardChart/DashboardChart'
import { useRouteMatch } from 'react-router-dom'
import DashboardSwitch from './../DashboardSwitch/DashboardSwitch'
import Table from './../Table/Table'
import NotificationComponent from '../NotificationComponent/NotificationComponent'
import NotificationContext from '../../../context/Notification/NotificationContext'

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'left',
    padding: theme.spacing(1),
    border: '1px solid red 0 10 10 10',
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    width: '100%',
    maxWidth: '100%',
  },
}))
const Dashboard = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  let { path } = useRouteMatch()

  let { user } = useContext(UserContext)
  let data = useContext(DataContext)
  let control = useContext(ControlContext)
  let notification = useContext(NotificationContext)

  let [points, setPoints] = useState([])
  let [controlMessage, setControlMessage] = useState(null)

  // useEffect(()=>console.log("Switch", switchStates),[switchStates])
  useEffect(() => {
    function pointAllocation() {
      // console.log("DATA IN DASH", data);
      let temp = [...data].slice(data.length - 25, data.length)
      setPoints(temp)
    }
    data && pointAllocation()
  }, [data])

  const headCells = [
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
  ]

  const viewerHandle = () => {
    setControlMessage("You can't control! Please contact the master user.")
    setTimeout(() => {
      setControlMessage(null)
    }, 5000)
  }
  return (
    <div>
      <Paper elevation={1} className={classes.heading}>
        <Typography variant="h6" component="h6">
          {user?.name}'s Dashboard
        </Typography>
      </Paper>

      {/* Outer Grid Container */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        padding={0}
        spacing={1}
      >
        <Grid
          container
          item
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={0}
          xs={12}
          md={9}
        >
          {/* Charts Container */}
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            padding={0}
          >
            <Grid item xs={12}>
              <Typography variant="h6" pl={2}>
                Charts
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardChart
                data={points}
                heading="Temperature"
                xAxis="time"
                yAxis="temp"
                width="95%"
                height="30%"
                chartType="Area"
                link={`${path}/sensor1`}
                chartAxisEnable={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardChart
                data={points}
                heading="Speed"
                xAxis="time"
                yAxis="speed"
                width="95%"
                height="20%"
                chartType="Line"
                LegendEnable={false}
                chartAxisEnable={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DashboardChart
                data={points}
                heading="Temperature+Speed"
                xAxis="time"
                yAxis="temp"
                width="95%"
                height="30%"
                chartType="Bar"
                LegendEnable={false}
                chartAxisEnable={true}
              />
            </Grid>
          </Grid>

          {/* Controller Container */}
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            padding={0}
          >
            <Grid item xs={12}>
              <Typography variant="h6" pl={2} mt={2}>
                Controlling System
              </Typography>
            </Grid>

            {controlMessage && (
              <Grid item xs={12}>
                <Alert severity="warning">{controlMessage}</Alert>
              </Grid>
            )}

            {control.switchStates && (
              <>
                <Grid item xs={12} md={3}>
                  <DashboardSwitch
                    heading="LED 1"
                    checked={control.switchStates.led1}
                    handleChange={
                      user?.userType === 'master' || user?.userType === 'owner'
                        ? control.handleChange
                        : viewerHandle
                    }
                    name="led1"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <DashboardSwitch
                    heading="LED 2"
                    checked={control.switchStates.led2}
                    handleChange={
                      user?.userType === 'master' || user?.userType === 'owner'
                        ? control.handleChange
                        : viewerHandle
                    }
                    name="led2"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <DashboardSwitch
                    heading="LED 3"
                    checked={control.switchStates.led3}
                    handleChange={
                      user?.userType === 'master' || user?.userType === 'owner'
                        ? control.handleChange
                        : viewerHandle
                    }
                    name="led3"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <DashboardSwitch
                    heading="LED 4"
                    checked={control.switchStates.led4}
                    handleChange={
                      user?.userType === 'master' || user?.userType === 'owner'
                        ? control.handleChange
                        : viewerHandle
                    }
                    name="led4"
                  />
                </Grid>
              </>
            )}
          </Grid>

          {/* Data Table */}
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            padding={0}
          >
            <Grid item xs={12}>
              <Typography variant="h6" pl={2} mt={2}>
                Data Table
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Table rows={data} headCells={headCells} />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={0}
          spacing={1}
          xs={12}
          md={3}
        >
          <Grid item xs={12}>
            <NotificationComponent notification={notification} />
          </Grid>
          <Grid item xs={12}>
            <Paper width="100%" style={{ minHeight: 200 }}>
              Car Details
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
