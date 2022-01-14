import React, { useState, useEffect, useContext } from 'react'
import {
  Paper,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Grid,
  Typography,
  Button,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import Cancel from '@mui/icons-material/Cancel'
import PersonAddAlt from '@mui/icons-material/PersonAddAlt'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import UserContext from '../../../context/User/UserContext'
import { accountCreate, accountTypeChnage, getAccounts } from '../../../API'

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'left',
    padding: 0,
    margin: 0,
  },
  paper: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    width: '100%',
    maxWidth: '1000px',
    marginBottom: theme.spacing(2),
  },
  inputField: {
    display: 'block',
  },
}))
const Accounts = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { user } = useContext(UserContext)

  let [users, setUsers] = useState([])
  let [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phno: '',
    userType: 'viewer',
  })
  const [formOpen, setFormOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // console.log(formData)
  useEffect(() => {
    const f = async () => {
      try {
        const res = await getAccounts({ APIkey: user.APIkey })
        // console.log(res.data)
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    user && f()
  }, [user])

  useEffect(() => {
    users.length > 0 && console.log('Accounts: ', users)
  }, [users])

  const handleChange = async (info) => {
    try {
      const res = await accountTypeChnage(info)
      // console.log(res.data)
      let temp = [...users]
      let index = temp.findIndex((u) => u._id === res.data._id)
      if (index !== -1) {
        temp[index] = res.data
        setUsers(temp)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  let inputFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email Id',
      type: 'text',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'text',
    },
    {
      name: 'phno',
      label: 'Phone No.',
      type: 'number',
    },
    {
      name: 'userType',
      label: 'User Type',
      type: 'select',
      menuItems: [
        { name: 'Owner', value: 'owner' },
        { name: 'Master', value: 'master' },
        { name: 'Viewer', value: 'viewer' },
        { name: 'Disable', value: 'disable' },
      ],
    },
  ]

  const handleFormDataChange = (e) => {
    // console.log(e.target.name, ' : ', e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleFormSubmit = async () => {
    // console.log('Form Data: ')
    // console.table(formData)
    setLoading(true)
    try {
      const res = await accountCreate({
        ...formData,
        APIkey: user.APIkey,
        owner_id: user._id,
      })
      setUsers((users) => [...users, res.data])
      setLoading(false)
      setFormOpen(false)
      setFormData({
        name: '',
        email: '',
        password: '',
        phno: '',
        userType: 'viewer',
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <>
      <h2 className="text-center underline">Accounts</h2>
      <div className="center-center" style={{ flexDirection: 'column' }}>
        {user.userType === 'owner' ? (
          !formOpen ? (
            <div
              style={{ width: '100%', maxWidth: '1000px', marginBottom: '1%' }}
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<PersonAddAlt />}
                onClick={() => setFormOpen(true)}
              >
                Add New User
              </Button>
            </div>
          ) : (
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item sm={12}>
                  <Typography variant="h6" component="h6">
                    New User Details
                  </Typography>
                </Grid>
                {inputFields.map((input) => {
                  if (input.type !== 'select') {
                    return (
                      <Grid item sm={12} md={6} key={input.name}>
                        <TextField
                          label={input.label}
                          variant="standard"
                          required
                          name={input.name}
                          className={classes.inputField}
                          fullWidth
                          onChange={handleFormDataChange}
                          type={input.type}
                          value={formData[input.name]}
                        />
                      </Grid>
                    )
                  } else if (input.type === 'select') {
                    return (
                      <Grid item sm={12} md={6} key={input.name}>
                        <TextField
                          label={input.label}
                          variant="standard"
                          required
                          name={input.name}
                          className={classes.inputField}
                          fullWidth
                          select
                          onChange={handleFormDataChange}
                          value={formData[input.name]}
                        >
                          {input.menuItems.map((menuItem) => (
                            <MenuItem
                              value={menuItem.value}
                              key={menuItem.name}
                            >
                              {menuItem.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    )
                  }

                  return null
                })}

                <Grid
                  item
                  sm={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginTop: '5px',
                  }}
                >
                  <LoadingButton
                    color="secondary"
                    onClick={handleFormSubmit}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                  >
                    Save
                  </LoadingButton>
                  <Button
                    variant="contained"
                    startIcon={<Cancel />}
                    style={{ marginLeft: '1%' }}
                    onClick={() => setFormOpen(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )
        ) : null}
        <TableContainer component={Paper} className={classes.paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone No.</TableCell>
                <TableCell>User Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user &&
                users.length > 0 &&
                users.map((u) => {
                  return (
                    <TableRow
                      key={u?._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user._id === u._id ? u?.name + ' (You)' : u?.name}
                      </TableCell>
                      <TableCell>{u?.email}</TableCell>
                      <TableCell>{u?.phno}</TableCell>
                      <TableCell>
                        {user.userType === 'owner' && user._id !== u?._id ? (
                          <Select
                            value={u?.userType}
                            labelId="Type"
                            onChange={(event) =>
                              handleChange({
                                owner_id: user._id,
                                user_id: u._id,
                                changeUserType: event.target.value,
                              })
                            }
                          >
                            <MenuItem value={'owner'}>Owner</MenuItem>
                            <MenuItem value={'master'}>Master</MenuItem>
                            <MenuItem value={'viewer'}>Viewer</MenuItem>
                            <MenuItem value={'disable'}>Disable</MenuItem>
                          </Select>
                        ) : (
                          u?.userType && capitalizeFirstLetter(u?.userType)
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default Accounts
