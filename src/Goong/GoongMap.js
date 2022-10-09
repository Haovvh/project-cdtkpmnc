import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { GeolocateControl } from '@goongmaps/goong-map-react';
import { MAP_KEY } from './GoongKEY';


const geolocateControlStyle = {
  right: 10,
  top: 10
};

function GongMap(props) {
  const [viewport, setViewport] = useState({
    latitude: 10.739,
    longitude: 106.6657,
    zoom: 12
  });
  

  if (props.Online === "Offline") {
    return null;
  }
  return (
    <ReactMapGL className='card card-container'
      {...viewport}
      width="70rem"
      height="50rem"
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
  );
}

export default GongMap;


