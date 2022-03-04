import React, { useEffect, useState } from 'react'
import {
  Grid,
  Paper,
  Typography,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import Chart from './Chart/Chart'

const useStyles = makeStyles((theme) => ({
  overFlowDiv: {
    overFlow: 'scroll',
    width: '100%',
    padding: 0,
  },
  heading: {
    textAlign: 'left',
    padding: 0,
    margin: 0,
  },
  paper: {
    padding: theme.spacing(1),
    width: '100%',
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
  },
}))

const ChartComponent = ({
  data,
  heading,
  xAxis,
  yAxis,
  width,
  height,
  defaultGraph,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [points, setPoints] = useState([{}])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [chartType, setChartType] = useState(
    defaultGraph ? defaultGraph : 'Area'
  )

  const handleChange = (event) => {
    console.log(event.target.value)
    setChartType(event.target.value)
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // useEffect(() => {
  //   if (data) {
  //     let p = [...data].slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     )
  //     setPoints(p)
  //     // console.log('data, page, rowsPerPage Changed!');
  //   }
  //   // console.log(JSON.stringify(p));
  // }, [data, page, rowsPerPage])

  useEffect(() => {
    // Calculation
    // (length - (totalpage-page-1)*rowPerPage - rowPerpage , length - (totalpage-page-1)*rowPerPage)

    if (data) {
      let totalpage = Math.ceil(data.length / rowsPerPage)
      let startIndex =
        data.length - (totalpage - page - 1) * rowsPerPage - rowsPerPage
      let endIndex = data.length - (totalpage - page - 1) * rowsPerPage

      let p = [...data].slice(startIndex < 0 ? 0 : startIndex, endIndex)
      setPoints(p)
      // console.log('data, page, rowsPerPage Changed!');
    }
    // console.log(JSON.stringify(p));
  }, [data, page, rowsPerPage])

  useEffect(() => {
    if (data) {
      let totalPage = Math.ceil(data.length / rowsPerPage)
      setPage(totalPage > 0 ? totalPage - 1 : 0)
      // console.log('data, rowsPerPage Changed!');
    }
  }, [data, rowsPerPage])

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
          <Typography variant="h6" component="div">
            {heading}
          </Typography>
        </Grid>
        <Grid item xs={4} md={2} ml="auto">
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chartType}
              label="Type"
              variant="standard"
              onChange={handleChange}
            >
              <MenuItem value={'Area'}>Area Graph</MenuItem>
              <MenuItem value={'Line'}>Line Graph</MenuItem>
              <MenuItem value={'Bar'}>Bar Graph</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.overFlowDiv}>
          <Chart
            width={width}
            height={height}
            points={points}
            chartType={chartType}
            xAxis={xAxis}
            yAxis={yAxis}
            CartesianGridEnable={true}
            TooltipEnable
            LegendEnable={chartType !== 'Area'}
            chartAxisEnable={true}
          />
        </Grid>
        <Grid item xs={12}>
          {data && (
            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Points Limit"
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ChartComponent
