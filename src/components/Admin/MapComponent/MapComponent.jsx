import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';




const AnyReactComponent = ({ text }) => <div>{text}</div>;

const formOpen = () => {

console.log("Hello")

}



class MapComponent extends Component {
  static defaultProps = {
    center: {
      lat: 22.57,
      lng: 88.36
    },
    zoom: 11
  };














  render() {
    return (
      // Important! Always set the container height explicitly
      <>
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyASG0ZEZRtavkRhlxvSu7ocLp7EUJ09fDc" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={22.57}
            lng={88.36}
            text="📌"
          />
          <AnyReactComponent
            lat={22.5754}
            lng={88.4798}
            text="📌"
          />
          <AnyReactComponent
            lat={22.5170}
            lng={88.4312}
            text="📌"
          />
          <AnyReactComponent
            lat={22.6420}
            lng={88.3658}
            text="📌"
          />
          <AnyReactComponent
            lat={22.5958}
            lng={88.2636}
            text="📌"
          />
           <AnyReactComponent
            lat={22.5056}
            lng={88.2500}
            text="📌"
          />
          <AnyReactComponent
            lat={22.4955}
            lng={88.3709}
            text="📌"
          />
          <AnyReactComponent
            lat={22.7674}
            lng={88.3711}
            text="📌"
          />
          <AnyReactComponent
            lat={22.5104}
            lng={88.3883}
            text="📌"
          />
          <AnyReactComponent
            lat={22.5126}
            lng={88.6097}
            text="📌"
          />
        </GoogleMapReact>
      </div>
        <div>
            <FormControl component="fieldset">
            <span>
      <FormLabel component="legend">Want to Sell or Buy charge?</FormLabel>
      </span>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="Donar"
          labelPlacement="end"
         

        />
        <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="Reciever"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>

        </div>

        


            


      </>
    );
  }
}

export default MapComponent;


