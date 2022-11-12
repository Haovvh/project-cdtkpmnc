import React, {useEffect} from 'react';
import { useState } from 'react';
import ReactMapGL, { GeolocateControl} from '@goongmaps/goong-map-react';
import { MAP_KEY } from './GoongKEY';
import io from "socket.io-client";
import authHeader from '../services/auth-header';

const WEB_SOCKET = 'http://localhost:9092/drivers'

const socket = io.connect(process.env.REACT_APP_WEBSOCKETHOST)
export default function GongMapDriver(props) {
  const param = { query: 'token=' }
          const socket = socketIOClient(WEB_SOCKET,param )

  const geolocateControlStyle = {
    right: 10,
    top: 10
  };

  const [viewport, setViewport] = useState({
    latitude: 10.739,
    longitude: 106.6657,
    zoom: 14
  });
  socket.on('drivers', (data) => {
    console.log(data)
  })
    

  useEffect (()=>{
      var delay = 5000;
      if (props.Online === "Online") {
          delay = 5000
      } else {
        delay = 5000
      }
      const intervalId = setInterval( () => {
        
          //process.env.REACT_APP_WEBSOCKETHOST,
          socket.emit('drivers', {
            id: 'abc',
            LAT: 'def',
            LNG: 'fgh'
          })

          // socket.emit("update_lat_lng", {
          //   id: authHeader().id,
          //   LAT: viewport.latitude,
          //   LNG: viewport.longitude
          // });
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


