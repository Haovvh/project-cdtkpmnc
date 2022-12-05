import React from 'react';
import { useState } from 'react';
import ReactMapGL, { GeolocateControl } from '@goongmaps/goong-map-react';
import { KEY_MAP } from '../public/const';


const geolocateControlStyle = {
  right: 10,
  top: 10
};
export default function GoongMap(props) {
  
  const [viewport, setViewport] = useState({
    latitude: 10.739,
    longitude: 106.6657,
    zoom: 14
  });
  
  
  return (
    <ReactMapGL className='container'
      {...viewport}
      width="65vw"
      height="55vh"
      mapStyle='https://tiles.goong.io/assets/goong_map_web.json'
      goongApiAccessToken={KEY_MAP}
      onViewportChange={setViewport}
    >
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />      
    </ReactMapGL>
    
  );
}


