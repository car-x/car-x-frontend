import React, { useContext } from 'react'
import Chart from './../Chart/Chart.jsx'
import Table from './../Table/Table';
import DataContext from '../../../context/Data/DataContext';

const Sensor2 = () => {

  let data = useContext(DataContext);
  // console.log(data);
  const headCells = [
    {
      name: 'time',
      label: 'Time',
    },
    {
      name: 'speed',
      label: 'Speed',
    }
  ];
  return (
    <div>
      <h2 className='text-center underline' >Speed Sensor</h2>
      <Chart data={data} heading='Speed vs Time Graph' xAxis='time' yAxis='speed' width='95%' height='30%' />
      <Table rows={data} headCells={headCells} />
    </div>
  )
}

export default Sensor2
