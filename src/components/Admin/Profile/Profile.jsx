import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material/styles'
import UserContext from './../../../context/User/UserContext'
import { Paper, TextField, Grid, Typography, Button } from '@mui/material'
import { Edit } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import Cancel from '@mui/icons-material/Cancel'
import { profileUpdate } from './../../../API/index'

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: 'left',
    padding: 0,
    margin: 0,
  },
  paper: {
    padding: theme.spacing(2),
    // paddingLeft: theme.spacing(4),
    // paddingRight: theme.spacing(4),
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(3),
    width: '100%',
    maxWidth: '1000px',
    marginBottom: theme.spacing(2),
  },
  inputField: {
    width: 'auto',
    flexGrow: 1,
  },
  Button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const Profile = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { user, setUser } = useContext(UserContext)

  const [inputFields, setInputFields] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setInputFields([
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        disable: true,
        enableEdit: false,
        value: user?.name,
      },
      {
        name: 'email',
        label: 'Email Id',
        type: 'text',
        disable: true,
        enableEdit: true,
        value: user?.email,
      },
      {
        name: 'password',
        label: 'Password',
        type: 'text',
        disable: true,
        enableEdit: true,
        value: user?.password,
      },
      {
        name: 'phno',
        label: 'Phone No.',
        type: 'number',
        disable: true,
        enableEdit: true,
        value: user?.phno,
      },
      {
        name: 'userType',
        label: 'User Type',
        type: 'select',
        disable: true,
        enableEdit: false,
        value: user?.userType,
      },
    ])
  }, [user])

  const handleEdit = (index) => {
    let temp = [...inputFields]
    temp[index].disable = !temp[index].disable
    // console.log('Temp:', temp)
    setInputFields(temp)
  }

  const handleChange = ({ index, value }) => {
    let temp = [...inputFields]
    temp[index].value = value
    console.log('Temp:', temp)
    setInputFields(temp)
  }

  const handleSubmit = async (formData, index) => {
    // console.table(formData)
    setLoading(true)
    try {
      const res = await profileUpdate({
        ...formData,
        user_id: user._id,
      })
      setUser(res.data)
      handleEdit(index)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <>
      <h2 className="text-center underline">Accounts</h2>
      <div className="center-center" style={{ flexDirection: 'column' }}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6">
                Your Details
              </Typography>
            </Grid>
            {inputFields.length > 0 &&
              inputFields.map((input, index) => {
                return (
                  <Grid item xs={12} key={input.name}>
                    <TextField
                      label={input.label}
                      variant="outlined"
                      fullWidth
                      name={input.name}
                      helperText={
                        input.enableEdit ? '' : "You Can't Change This Field"
                      }
                      onChange={(event) =>
                        handleChange({
                          index: index,
                          value: event.target.value,
                        })
                      }
                      type={input.type}
                      value={input.value ? input.value : ''}
                      disabled={input.disable}
                    />
                    {input.enableEdit ? (
                      input.disable ? (
                        <div className={classes.Button}>
                          <Button
                            variant="outlined"
                            startIcon={<Edit />}
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </Button>
                        </div>
                      ) : (
                        <>
                          <LoadingButton
                            color="secondary"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            onClick={() =>
                              handleSubmit(
                                {
                                  fieldName: input.name,
                                  fieldValue: input.value,
                                },
                                index
                              )
                            }
                          >
                            Save
                          </LoadingButton>
                          <Button
                            variant="contained"
                            startIcon={<Cancel />}
                            style={{ marginLeft: '1%' }}
                            onClick={() => handleEdit(index)}
                          >
                            Cancel
                          </Button>
                        </>
                      )
                    ) : null}
                  </Grid>
                )
              })}

            {/* <Grid item sm={12}>
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
          </Grid> */}
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default Profile
