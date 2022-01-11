import React, { useContext } from 'react'
import Chart from '../ChartComponent/ChartComponent'
import Table from '../Table/Table'
import DataContext from '../../../context/Data/DataContext'

const Sensor = (props) => {
  let data = useContext(DataContext)

  console.log(props.title, ' Sensor JSX', props)

  return (
    <div>
      <h2 className="text-center underline">{props.title}</h2>
      <Chart
        data={data}
        heading={props.title}
        xAxis={props.headCells[0].name}
        yAxis={props.headCells[1].name}
        width="95%"
        height="30%"
        defaultGraph="Area"
      />
      <Table rows={data} headCells={props.headCells} />
    </div>
  )
}

export default Sensor
