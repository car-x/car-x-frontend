import React, { useState, useEffect, useContext } from 'react'
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import { FilterAltTwoTone, FilterAltOffTwoTone } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import DataContext from './../../../context/Data/DataContext'
import ChartComponent from '../ChartComponent/ChartComponent'

import { DragHandle } from './DragHandle'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: '100%',
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
  },
  checkbox: {
    // padding: theme.spacing(1),
    margin: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}))

const AdvancedView = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  // console.log(props);

  //   sensors: [
  //     {
  //       name: 'Temperature',
  //       title: 'Temperature Sensor',
  //       path: '/temperature',
  //       icon: '',
  //       headCells: [
  //         {
  //           name: 'time',
  //           label: 'Time',
  //         },
  //         {
  //           name: 'temp',
  //           label: 'Temperature',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Speed',
  //       title: 'Speed Sensor',
  //       path: '/speed',
  //       icon: '',
  //       headCells: [
  //         {
  //           name: 'time',
  //           label: 'Time',
  //         },
  //         {
  //           name: 'speed',
  //           label: 'Speed',
  //         },
  //       ],
  //     },
  //   ],

  const [allChart, setAllChart] = useState([])
  const [selectedChart, setSelectedChart] = useState([])
  const [openFilterMenu, setOpenFilterMenu] = useState(false)

  let data = useContext(DataContext)

  const openFilter = () => {
    setOpenFilterMenu(!openFilterMenu)
  }

  const selectChartHandler = (event) => {
    // console.log(event)
    if (event.target.checked === true) {
      setSelectedChart(() => [
        ...selectedChart,
        { ...allChart.find((a) => a.name === event.target.name) },
      ])
    } else if (event.target.checked === false) {
      setSelectedChart(() =>
        selectedChart.filter((a) => a.name !== event.target.name)
      )
    }
  }

  const getValue = (name) => {
    let val = selectedChart.findIndex((a) => a.name === name) !== -1
    console.log('Runs :', val)
    return val
  }

  useEffect(() => {
    let temp = props.sensors?.map((sensor, index) => {
      return {
        id: index,
        name: sensor.name,
        label: sensor.title,
        xAxis: sensor.headCells[0].name,
        yAxis: sensor.headCells[1].name,
      }
    })
    console.log('All Chart :', temp)
    setAllChart(temp)
  }, [props.sensors])

  useEffect(() => {
    console.log('Selected Chart: ', selectedChart)
  }, [selectedChart])

  return (
    <div>
      <h2 className="text-center underline">Advanced View</h2>

      <div>
        <IconButton
          size="large"
          onClick={openFilter}
          className={classes.button}
        >
          {openFilterMenu ? (
            <FilterAltOffTwoTone fontSize="large" />
          ) : (
            <FilterAltTwoTone fontSize="large" />
          )}
        </IconButton>
        {openFilterMenu && (
          <Paper className={classes.paper}>
            <div>
              <Typography variant="h6">All Charts</Typography>
            </div>
            <div>
              {allChart.length > 0 &&
                allChart.map((chart, index) => (
                  <FormControlLabel
                    key={index}
                    name={chart.name}
                    checked={getValue(chart.name)}
                    control={<Checkbox />}
                    label={chart.label}
                    labelPlacement="end"
                    className={classes.checkbox}
                    onChange={selectChartHandler}
                  />
                ))}
            </div>
          </Paper>
        )}
      </div>

      <div>
        <DragDropContext
          onDragEnd={(param) => {
            const srcI = param.source.index
            const desI = param.destination?.index
            if (desI !== null) {
              setSelectedChart(() => {
                let temp = [...selectedChart]
                temp.splice(desI, 0, temp.splice(srcI, 1)[0])
                console.log(temp)
                return temp
              })
            }
          }}
        >
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {selectedChart.map((c, index) => (
                  <Draggable
                    key={c.name}
                    draggableId={'draggable-' + c.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div>
                        <DragHandle {...provided.dragHandleProps} />
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                              ? '0 0 .4rem #666'
                              : 'none',
                          }}
                        >
                          <ChartComponent
                            key={index}
                            data={data}
                            heading={c.label}
                            xAxis={c.xAxis}
                            yAxis={c.yAxis}
                            width="95%"
                            height="30%"
                            defaultGraph="Area"
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default AdvancedView
