import React, {useEffect, useState} from 'react';
import ReactMapGL, { GeolocateControl} from '@goongmaps/goong-map-react';
import { MAP_KEY } from './GoongKEY';
import driverService from '../apiService/driver.service';
import userService from '../apiService/user.service';


export default function GoongMapDriver(props) {
  const driverId = userService.getCurrentUser().id;
  const geolocateControlStyle = {
    right: 10,
    top: 10
  };

  const [viewport, setViewport] = useState({
    latitude: 10.739,
    longitude: 106.6657,
    zoom: 14
  });
  
    

  useEffect (()=>{
      var delay = 5000;
      if (props.Online === "Online") {
          delay = 5000
      } else {
        delay = 100000
      }
      const intervalId = setInterval( () => {
        driverService.updatelocation(driverId, viewport.latitude, viewport.longitude).then(
          reponse => {
            console.log(reponse)
          }, error => {
            console.log(error)
          }
        )
        
      }, delay) 
      return () => clearInterval(intervalId); //This is important   
    
    },[]
  )

  
  return (
    <React.Fragment>

    <ReactMapGL className='container'
      {...viewport}
      width="60vw"
      height="60vh"
      mapStyle='https://tiles.goong.io/assets/goong_map_web.json'
      goongApiAccessToken={MAP_KEY}
      onViewportChange={setViewport}
    >
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />
      
    </ReactMapGL>
    </React.Fragment>
  );
}


