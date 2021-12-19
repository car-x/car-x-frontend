import React, { useContext } from 'react'
import Chart from './../Chart/Chart.jsx'
import Table from './../Table/Table';
import DataContext from './../../context/Data/DataContext';

const Sensor1 = () => {
  // const data = [
  //   {
  //     "_id": "61b616e7b9c26203871d4175",
  //     "temp": 100,
  //     "time": 1    
  //   },
  //   {
  //     "_id": "61b61aaa84ec9e37253780bb",
  //     "temp": 80,
  //     "time": 2    
  //   },
  //   {
  //     "_id": "61b61aba84ec9e37253780bd",
  //     "temp": 110,
  //     "time": 3    
  //   },
  //   {
  //     "_id": "61b61ace84ec9e37253780bf",
  //     "temp": 70,
  //     "time": 4    
  //   },
  //   {
  //     "_id": "61b61aaa84ec9e37253780bb",
  //     "temp": 80,
  //     "time": 5    
  //   },
  //   {
  //     "_id": "61b61aba84ec9e37253780bd",
  //     "temp": 110,
  //     "time": 6    
  //   },
  //   {
  //     "_id": "61b61ace84ec9e37253780bf",
  //     "temp": 70,
  //     "time": 7
  //   },
  //   {
  //     "_id": "61b61aaa84ec9e37253780bb",
  //     "temp": 80,
  //     "time": 8   
  //   },
  //   {
  //     "_id": "61b61aba84ec9e37253780bd",
  //     "temp": 110,
  //     "time": 9
  //   },
  //   {
  //     "_id": "61b61ace84ec9e37253780bf",
  //     "temp": 70,
  //     "time": 10
  //   },
  //   {
  //     "_id": "61b61aaa84ec9e37253780bb",
  //     "temp": 80,
  //     "time": 11
  //   },
  //   {
  //     "_id": "61b61aba84ec9e37253780bd",
  //     "temp": 110,
  //     "time": 12
  //   },
  //   {
  //     "_id": "61b61ace84ec9e37253780bf",
  //     "temp": 70,
  //     "time": 13
  //   },
  //   {
  //     "_id": "61b61aaa84ec9e37253780bb",
  //     "temp": 80,
  //     "time": 14
  //   },
  //   {
  //     "_id": "61b61aba84ec9e37253780bd",
  //     "temp": 110,
  //     "time": 15
  //   },
  //   {
  //     "_id": "61b61ace84ec9e37253780bf",
  //     "temp": 70,
  //     "time": 16
  //   },{
  //     "_id": "61b616e7b9c26203871d4175",
  //     "temp": 100,
  //     "time": 17
  //   },
  //   {
  //     "_id": "61b61aaa84ec9e37253780bb",
  //     "temp": 80,
  //     "time": 18
  //   },
  //   {
  //     "_id": "61b61aba84ec9e37253780bd",
  //     "temp": 110,
  //     "time": 19
  //   },
  //   {
  //     "_id": "61b61ace84ec9e37253780bf",
  //     "temp": 70,
  //     "time": 20
  //   },{
  //     "_id": "61b61aaa84ec9e37253780bb",
  //     "temp": 80,
  //     "time": 21
  //   },
  //   {
  //     "_id": "61b61aba84ec9e37253780bd",
  //     "temp": 110,
  //     "time": 22
  //   },
  //   {
  //     "_id": "61b61ace84ec9e37253780bf",
  //     "temp": 200,
  //     "time": 23
  //   },
  //   {
  //     "_id": "61b61aaa84ec9e37253780bb",
  //     "temp": 80,
  //     "time": 24
  //   },
  //   {
  //     "_id": "61b61aba84ec9e37253780bd",
  //     "temp": 110,
  //     "time": 25
  //   },
  //   {
  //     "_id": "61b61ace84ec9e37253780bf",
  //     "temp": 70,
  //     "time": 26
  //   },{
  //     "_id": "61b616e7b9c26203871d4175",
  //     "temp": 100,
  //     "time": 27
  //   },
  //   {
  //     "_id": "61b61aaa84ec9e37253780bb",
  //     "temp": 80,
  //     "time": 28
  //   },
  //   {
  //     "_id": "61b61aba84ec9e37253780bd",
  //     "temp": 110,
  //     "time": 29
  //   },
  //   {
  //     "_id": "61b61aba84ec9e37253780bd",
  //     "temp": 110,
  //     "time": 30
  //   },
  // ];

  let data = useContext(DataContext);
  console.log(data);
  const headCells = [
    {
      name: 'time',
      label: 'Time',
    },
    {
      name: 'temp',
      label: 'Temperature',
    }
  ];
  return (
    <div>
      <h2 className='text-center underline' >Temperature Sensor</h2>
      <Chart data={data} heading='Temperature vs Time Graph' xAxis='time' yAxis='temp' width='95%' height='30%' />
      <Table rows={data} headCells={headCells} />
    </div>
  )
}

export default Sensor1
