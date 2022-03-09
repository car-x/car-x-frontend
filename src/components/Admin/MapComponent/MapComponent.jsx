import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
// import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import { TextField } from '@mui/material'

const AnyReactComponent = ({ text }) => <div className="icon">{text}</div>

// const formOpen = () => {
//   console.log('Hello')
// }

class MapComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSeller: true,
      isReceiver: true,
    }
  }

  static defaultProps = {
    center: {
      lat: 22.57,
      lng: 88.36,
    },
    zoom: 11,
  }

  sellerFormHandler = (event) => {
    // console.log(event)
    if (event.target.checked) {
      this.setState({
        isSeller: true,
      })
    } else {
      this.setState({
        isSeller: false,
      })
    }
  }

  receiverFormHandler = (event) => {
    // console.log(event)
    if (event.target.checked) {
      this.setState({
        isReceiver: true,
      })
    } else {
      this.setState({
        isReceiver: false,
      })
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <>
        <div style={{ height: '70vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyASG0ZEZRtavkRhlxvSu7ocLp7EUJ09fDc',
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent lat={22.57} lng={88.36} text="🔌" />
            <AnyReactComponent lat={22.5754} lng={88.4798} text="🔌" />
            <AnyReactComponent lat={22.517} lng={88.4312} text="🔌" />
            <AnyReactComponent lat={22.642} lng={88.3658} text="🔌" />
            <AnyReactComponent lat={22.5958} lng={88.2636} text="🔌" />
            <AnyReactComponent lat={22.57} lng={88.36} text="🔌" />

            {/* {this.state.isSeller && (
              <> */}

            {this.state.isSeller && (
              <AnyReactComponent lat={22.5} lng={88.0} text="🚗" />
            )}
            {this.state.isSeller && (
              <AnyReactComponent lat={22.9} lng={88.4312} text="🚗" />
            )}
            {this.state.isSeller && (
              <AnyReactComponent lat={22.2} lng={88.3658} text="🚗" />
            )}
            {this.state.isSeller && (
              <AnyReactComponent lat={22.4} lng={88.2636} text="🚗" />
            )}
            {this.state.isSeller && (
              <AnyReactComponent lat={22.5056} lng={88.25} text="🚗" />
            )}
            {/* </>
            )} */}

            {this.state.isReceiver && (
              <AnyReactComponent lat={22.4955} lng={88.4} text="🚙" />
            )}
            {this.state.isReceiver && (
              <AnyReactComponent lat={22.7674} lng={88.2} text="🚙" />
            )}
            {this.state.isReceiver && (
              <AnyReactComponent lat={22.5104} lng={87.99} text="🚙" />
            )}
            {this.state.isReceiver && (
              <AnyReactComponent lat={22.5126} lng={88.6097} text="🚙" />
            )}
            {this.state.isReceiver && (
              <AnyReactComponent lat={22.5126} lng={88.5} text="🚙" />
            )}

            <AnyReactComponent lat={22.5126} lng={88.6097} text="📍" />
          </GoogleMapReact>
        </div>
        <div>
          <FormControl component="fieldset">
            <span>
              <FormLabel component="legend">
                Want to Sell or Buy charge?
              </FormLabel>
            </span>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Seller"
                labelPlacement="end"
                onChange={this.sellerFormHandler}
                checked={this.state.isSeller}
              />
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Reciever"
                labelPlacement="end"
                onChange={this.receiverFormHandler}
                checked={this.state.isReceiver}
              />
            </FormGroup>
            {this.state.isSeller && (
              <FormGroup aria-label="position" row>
                <TextField
                  id="outlined-basic"
                  label="Percentage of Charge"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                />
              </FormGroup>
            )}
          </FormControl>
        </div>
      </>
    )
  }
}

export default MapComponent
