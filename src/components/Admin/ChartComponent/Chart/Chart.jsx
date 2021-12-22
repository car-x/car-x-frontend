import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, AreaChart, Area, BarChart, Bar } from 'recharts'
import { useTheme } from '@mui/material/styles';


const Chart = ({width, height, points, chartType, xAxis, yAxis, CartesianGridEnable, TooltipEnable, LegendEnable }) => {

  const theme = useTheme();

  let chartAxis = 
    <>
      <XAxis dataKey={xAxis} stroke={theme.palette.text.secondary} />
      <YAxis mirror={true} stroke={theme.palette.text.secondary}  /> 
    </>;
  let chartCartesianGrid = CartesianGridEnable ? <CartesianGrid strokeDasharray="3 3"  stroke={theme.palette.divider} /> : null;
  let chartToolTip = TooltipEnable ? <Tooltip contentStyle={{backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary}} /> : null;
  let chartLegend = LegendEnable ? <Legend align="left" verticalAlign="bottom" margin={{ top: 10, left: 0, right: 0, bottom: 0 }} /> : null; 

  let graph = (chartType === 'Area') ? 
    (
      <AreaChart data={points}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="98%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        {chartCartesianGrid}
        {chartToolTip}
        {chartAxis}
        {chartLegend}
        <Area type="monotone" dataKey={yAxis} stroke="#8884d8" fillOpacity={1} fill="url(#color)" />
        {}
      </AreaChart>
      
      )
    : (chartType === 'Line') ? 
    (
      <LineChart data={points} >
        {chartCartesianGrid}
        {chartToolTip}
        {chartAxis}
        {chartLegend}
        <Line type="monotone" dataKey={yAxis} strokeWidth={3} stroke={theme.palette.secondary.dark} />
      </LineChart>
    )
    : (
        <BarChart data={points}>
          {chartCartesianGrid}
          {chartToolTip}
          {chartAxis}
          {chartLegend}
          <Bar dataKey={yAxis} fill="#82ca9d" />
        </BarChart>
      );
  return (
    <ResponsiveContainer width={width?width:'95%'} height={height?height:'30%'} minHeight={180}  >
      {graph}
    </ResponsiveContainer>
  )
}

export default Chart;
