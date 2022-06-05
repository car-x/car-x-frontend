import React, { useState, useContext } from 'react'

import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
// import UserContext from '../../../context/User/UserContext'
import {
  Paper,
  Grid,
  Typography,
  Switch,
  Divider,
  Alert,
  IconButton,
  Fade,
  CircularProgress,
  Slider,
} from '@mui/material'
import { Lightbulb } from '@mui/icons-material'
import UserContext from './../../../context/User/UserContext'
import ControlContext from './../../../context/Control/ControlContext'

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'left',
    padding: 0,
    margin: 0,
  },
  paper: {
    padding: theme.spacing(2),
    // paddingLeft: theme.spacing(4),
    // paddingRight: theme.spacing(4),
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(3),
    width: '100%',
    maxWidth: '1000px',
    marginBottom: theme.spacing(2),
  },
  inputField: {
    width: 'auto',
    flexGrow: 1,
  },
  Button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  controllerTitle: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  subtitles: {
    paddingLeft: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  Switch: {
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  },
  flex_space_between: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  Divider: {
    marginTop: theme.spacing(2),
  },
}))

const ControllerComponent = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  let { user } = useContext(UserContext)
  let control = useContext(ControlContext)

  let [controlMessage, setControlMessage] = useState(null)
  const [sliderValue, setSliderValue] = useState(control.switchStates['sm1'])

  const sliderChange = (e, newVal) => {
    setSliderValue(newVal)
  }
  const viewerHandle = () => {
    setControlMessage(
      "You can't control! Please contact the Owner/Master user."
    )
    setTimeout(() => {
      setControlMessage(null)
    }, 5000)
  }

  return (
    <>
      <h2 className="text-center underline">Controls</h2>
      <div className="center-center" style={{ flexDirection: 'column' }}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            {controlMessage && (
              <Grid item xs={12}>
                <Alert severity="warning">{controlMessage}</Alert>
              </Grid>
            )}
            {/* <Grid item xs={12}>
              <Typography
                variant="h6"
                component="h6"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <ArrowCircleDown /> &nbsp; All Controls Below
              </Typography>
            </Grid> */}
            {props.controls?.map((c, index) => (
              <Grid item xs={12} key={c.name}>
                <div className={classes.flex_space_between}>
                  <Typography
                    variant="h6"
                    component="h6"
                    className={classes.controllerTitle}
                  >
                    <IconButton>
                      <Lightbulb
                        style={{
                          color: control.switchStates[c.name] ? 'gold' : 'gray',
                        }}
                        fontSize="large"
                      />
                    </IconButton>
                    {c.heading}
                  </Typography>
                  <Fade
                    in={control.loading}
                    style={{
                      transitionDelay: true ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                  >
                    <CircularProgress />
                  </Fade>
                  {c.type === 'button' ? (
                    <Switch
                      size="medium"
                      // style={{ width: 62 }}
                      className={classes.Switch}
                      checked={control.switchStates[c.name]}
                      onChange={
                        user?.userType === 'master' ||
                        user?.userType === 'owner'
                          ? control.handleChange
                          : viewerHandle
                      }
                      name={c.name}
                    />
                  ) : (
                    <Slider
                      min={0}
                      max={180}
                      aria-label="Default"
                      name={c.name}
                      onChange={
                        user?.userType === 'master' ||
                        user?.userType === 'owner'
                          ? sliderChange
                          : viewerHandle
                      }
                      onChangeCommitted={(e) =>
                        user?.userType === 'master' ||
                        user?.userType === 'owner'
                          ? control.handleChange(e, sliderValue)
                          : viewerHandle
                      }
                      value={control.switchStates[c.name]}
                      valueLabelDisplay="auto"
                    />
                  )}
                </div>
                <Typography
                  variant="subtitle1"
                  component="div"
                  className={classes.subtitles}
                  gutterBottom
                >
                  {c.details}
                </Typography>
                {index !== props.controls.length - 1 && (
                  <Divider className={classes.Divider} />
                )}
              </Grid>
            ))}
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default ControllerComponent
