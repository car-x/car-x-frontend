import React, {useEffect, useState} from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, AreaChart, Area, BarChart, Bar } from 'recharts'
import { Grid, Paper, Typography, TablePagination, FormControl, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  overFlowDiv: {
    overFlow: 'scroll',
    width: '100%',
    padding: 0
  },
  heading: {
    textAlign: 'left',
    padding: 0,
    margin: 0
  },
  paper: {
    padding: theme.spacing(1),
    width: '100%',
    maxWidth: '100%',
    marginBottom: theme.spacing(2)

  },

}));

const Chart = ({data, heading, xAxis, yAxis, width, height}) => {
  

  const theme = useTheme();
  const classes = useStyles(theme);

  const [points, setPoints] = useState([{}]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [graphType, setGraphType] = useState('Area');

  const handleChange = (event) => {
    console.log(event.target.value);
    setGraphType(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if(data){
      let p = [...data].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
      setPoints(p);
      console.log('Changed!');
    }
    // console.log(JSON.stringify(p));
  }, [ data, page, rowsPerPage]);

  useEffect(()=>{
    if(data){
    let totalPage = Math.ceil(data.length / rowsPerPage );
    setPage(totalPage > 0 ? totalPage -1 : 0);
    console.log('Changed 2!');
    }
  },[data, rowsPerPage]);

  let graph = (graphType === 'Area') ? 
    (<ResponsiveContainer width={width} height={'30%'} minHeight={180}  >
      <AreaChart data={points}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="98%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        {/* <CartesianGrid strokeDasharray="3 3"  stroke={theme.palette.divider} /> */}
        <XAxis dataKey={xAxis} stroke={theme.palette.text.secondary} />
        <YAxis mirror={true} stroke={theme.palette.text.secondary}  />
        <Tooltip 
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary
          }} />
        <Area type="monotone" dataKey={yAxis} stroke="#8884d8" fillOpacity={1} fill="url(#color)" />
      </AreaChart>
    </ResponsiveContainer> )
    : (graphType === 'Line') ? 
    (<ResponsiveContainer width={width} height={height} minHeight={180}  >
      <LineChart data={points} >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis dataKey={xAxis} stroke={theme.palette.text.secondary} />
        <YAxis mirror={true} stroke={theme.palette.text.secondary} />
        <Tooltip 
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary
        }} />
        <Line type="monotone" dataKey={yAxis} strokeWidth={3} stroke={theme.palette.secondary.dark} />
        <Legend align="left" verticalAlign="bottom" margin={{ top: 10, left: 0, right: 0, bottom: 0 }} />
      </LineChart>
    </ResponsiveContainer>)
    : (<ResponsiveContainer width={width} height={height} minHeight={180}  >
        <BarChart data={points}>
          <CartesianGrid strokeDasharray="3 3"  stroke={theme.palette.divider} />
          <XAxis dataKey={xAxis} stroke={theme.palette.text.secondary} />
          <YAxis mirror={true} stroke={theme.palette.text.secondary} />
          <Tooltip 
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary
            }} />
          <Bar dataKey={yAxis} fill="#82ca9d" />
          <Legend align="left" verticalAlign="bottom" margin={{ top: 10, left: 0, right: 0, bottom: 0 }} />
        </BarChart>
      </ResponsiveContainer>);

  return (
    <Paper elevation={2} className={classes.paper}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        padding={2}
      >
        <Grid item xs={8} md={10}>
          <Typography variant="h6" component="div" >{heading}</Typography>
        </Grid>
        <Grid item xs={4} md={2} ml='auto'>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={graphType}
              label="Type"
              variant='standard'
              onChange={handleChange}
            >
              <MenuItem value={'Area'}>Area Graph</MenuItem>
              <MenuItem value={'Line'}>Line Graph</MenuItem>
              <MenuItem value={'Bar'}>Bar Graph</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.overFlowDiv} >
          {graph}
        </Grid>
        <Grid item xs={12}>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage = 'Points Limit'
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Chart
