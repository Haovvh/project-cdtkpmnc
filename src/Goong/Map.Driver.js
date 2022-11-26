import React, {useEffect, useState} from 'react';
import ReactMapGL, { GeolocateControl} from '@goongmaps/goong-map-react';
import { MAP_KEY } from '../public/const';
import driverService from '../apiService/driver';
import userService from '../apiService/customer';


export default function GoongMapDriver(props) {
  const driverId = userService.getCurrentUser().id;
  const geolocateControlStyle = {
    right: 10,
    top: 10
  };

  const [viewport, setViewport] = useState({
    latitude: 10.789141001039244,
    longitude: 106.70855100000007,
    zoom: 14
    //10.789141001039244     LNG: 106.70855100000007
  });
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  

    

  useEffect (()=>{
      var delay = 5000;
      
      if (props.Online ) {
          delay = 5000
      } else {
        delay = 100000
      }
      const intervalId = setInterval( () => {
        console.log("LAT: " + viewport.latitude + "     LNG: " + viewport.longitude)
        if(viewport.latitude >0 && viewport.longitude >0 ) {
          driverService.updateLocation(driverId, viewport.latitude, viewport.longitude).then(
            reponse => {
              console.log(reponse.status)
            }, error => {
              console.log(error)
            }
          )
        }
        
      }, delay) 
      return () => clearInterval(intervalId); //This is important   
    
    },[viewport.latitude, viewport.longitude]
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


