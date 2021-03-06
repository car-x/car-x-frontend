import React, { useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { Typography, Paper, Grid, Alert, Skeleton } from '@mui/material'
import UserContext from './../../../context/User/UserContext'
import DataContext from './../../../context/Data/DataContext'
import ControlContext from './../../../context/Control/ControlContext'
import { useState } from 'react'
import { useEffect } from 'react'
import DashboardChart from '../ChartComponent/DashboardChart/DashboardChart'
import { useRouteMatch } from 'react-router-dom'
import DashboardSwitch from '../ControllerComponent/DashboardSwitch/DashboardSwitch'
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

const Dashboard = (props) => {
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
      let temp = [...data].slice(
        data.length - 25 < 0 ? 0 : data.length - 25,
        data.length
      )
      setPoints(temp)
    }
    data && pointAllocation()
  }, [data])

  const viewerHandle = () => {
    setControlMessage(
      "You can't control! Please contact the Owner/Master user."
    )
    setTimeout(() => {
      setControlMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Paper elevation={1} className={classes.heading}>
        {user ? (
          <Typography variant="h6" component="h6">
            {user?.name}'s Dashboard
          </Typography>
        ) : (
          <Skeleton variant="h3" />
        )}
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
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
            padding={0}
          >
            <Grid item xs={12}>
              <Typography variant="h6" pl={2}>
                Charts
              </Typography>
            </Grid>
            {props.sensors.map((sensor, index) => {
              const c = ['Area', 'Line', 'Bar']

              return (
                <Grid item xs={12} md={4} key={sensor.name}>
                  {points.length === 0 ? (
                    <Skeleton
                      variant="rectangular"
                      width={'100%'}
                      height={120}
                    />
                  ) : (
                    <DashboardChart
                      data={points}
                      heading={sensor.name}
                      xAxis={sensor.headCells[0].name}
                      yAxis={sensor.headCells[1].name}
                      width="95%"
                      height="30%"
                      maxHeight={80}
                      chartType={c[index % 3]}
                      TooltipEnable={true}
                      link={`${path}${sensor.path}`}
                    />
                  )}
                </Grid>
              )
            })}
            {/* <Grid item xs={12} md={4}>
              <DashboardChart
                data={points}
                heading="Temperature"
                xAxis="time"
                yAxis="temp"
                width="95%"
                height="30%"
                maxHeight={80}
                chartType="Area"
                TooltipEnable={true}
                link={`${path}/sensor1`}
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
                maxHeight={80}
                chartType="Line"
                TooltipEnable={true}
                LegendEnable={false}
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
                maxHeight={80}
                chartType="Bar"
                TooltipEnable={true}
                LegendEnable={false}
              />
            </Grid> */}
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

            {
              props.controls?.map((c) => (
                <Grid item xs={12} md={3} key={c.name}>
                  {control.switchStates ? (
                    <DashboardSwitch
                      type={c.type}
                      heading={c.heading}
                      checked={control.switchStates[c.name]}
                      value={control.switchStates[c.name]}
                      handleChange={
                        user?.userType === 'master' ||
                        user?.userType === 'owner'
                          ? control.handleChange
                          : viewerHandle
                      }
                      name={c.name}
                    />
                  ) : (
                    <Skeleton variant="rectangular" height={80} />
                  )}
                </Grid>
              ))

              // (
              //   <>
              //     <Grid item xs={12} md={3}>
              //       <DashboardSwitch
              //         heading="LED 1"
              //         checked={control.switchStates.led1}
              //         handleChange={
              //           user?.userType === 'master' || user?.userType === 'owner'
              //             ? control.handleChange
              //             : viewerHandle
              //         }
              //         name="led1"
              //       />
              //     </Grid>
              //     <Grid item xs={12} md={3}>
              //       <DashboardSwitch
              //         heading="LED 2"
              //         checked={control.switchStates.led2}
              //         handleChange={
              //           user?.userType === 'master' || user?.userType === 'owner'
              //             ? control.handleChange
              //             : viewerHandle
              //         }
              //         name="led2"
              //       />
              //     </Grid>
              //     <Grid item xs={12} md={3}>
              //       <DashboardSwitch
              //         heading="LED 3"
              //         checked={control.switchStates.led3}
              //         handleChange={
              //           user?.userType === 'master' || user?.userType === 'owner'
              //             ? control.handleChange
              //             : viewerHandle
              //         }
              //         name="led3"
              //       />
              //     </Grid>
              //     <Grid item xs={12} md={3}>
              //       <DashboardSwitch
              //         heading="LED 4"
              //         checked={control.switchStates.led4}
              //         handleChange={
              //           user?.userType === 'master' || user?.userType === 'owner'
              //             ? control.handleChange
              //             : viewerHandle
              //         }
              //         name="led4"
              //       />
              //     </Grid>
              //   </>
              // )
            }
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
              {data.length > 0 ? (
                <Table rows={data} headCells={props.tableHeadCells} />
              ) : (
                <>
                  <Skeleton variant="rectangular" height={60} />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              )}
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
              System Details
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
