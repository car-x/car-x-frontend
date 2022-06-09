import React from 'react'
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { Paper, Slider, Switch, Typography } from '@mui/material'
import { useState, useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'center',
    padding: theme.spacing(1),
    margin: 0,
  },
  paper: {
    padding: theme.spacing(1),
    width: '100%',
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const DashboardSwitch = ({
  heading,
  checked,
  handleChange,
  name,
  type,
  value,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [sliderValue, setSliderValue] = useState(value)

  useEffect(() => {
    setSliderValue(value)
  }, [value])

  const sliderChange = (e, newVal) => {
    setSliderValue(newVal)
  }
  return (
    <Paper elevation={1} className={classes.paper}>
      <Typography
        variant="h6"
        component="div"
        className={classes.heading}
        gutterBottom
      >
        {heading}
      </Typography>
      {type === 'button' ? (
        <Switch
          checked={checked}
          onChange={handleChange}
          name={name}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      ) : (
        <Slider
          min={0}
          max={180}
          aria-label="Default"
          name={name}
          onChange={sliderChange}
          onChangeCommitted={(e) => handleChange(e, sliderValue)}
          value={sliderValue}
          valueLabelDisplay="auto"
        />
      )}
    </Paper>
  )
}

export default DashboardSwitch
