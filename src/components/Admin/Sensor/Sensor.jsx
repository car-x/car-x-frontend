import React, { useContext } from 'react'
import Chart from '../ChartComponent/ChartComponent'
import Table from '../Table/Table'
import DataContext from '../../../context/Data/DataContext'
import { Skeleton } from '@mui/material'

const Sensor = (props) => {
  let data = useContext(DataContext)

  console.log(props.title, ' Sensor JSX', props)

  return (
    <div>
      <h2 className="text-center underline">{props.title}</h2>
      {data.length > 0 ? (
        <Chart
          data={data}
          heading={props.title}
          xAxis={props.headCells[0].name}
          yAxis={props.headCells[1].name}
          width="95%"
          height="30%"
          defaultGraph="Area"
        />
      ) : (
        <Skeleton
          variant="rectangular"
          style={{ marginBottom: '2%' }}
          height={220}
        />
      )}

      {data.length > 0 ? (
        <Table rows={data} headCells={props.headCells} />
      ) : (
        <>
          <Skeleton variant="rectangular" height={60} />
          <Skeleton style={{ marginTop: '1%' }} />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
    </div>
  )
}

export default Sensor
