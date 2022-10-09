import * as React from 'react';
import ReactMapGL, {Source, Layer} from '@goongmaps/goong-map-react';
import { MAP_KEY } from './GoongKEY';

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  ]
};

const layerStyle = {
  id: 'route',
  type: 'line',  
  paint: {
    'line-color': '#1e88e5',
    'line-width': 8
    }
};
//20.981971,105.864323

export default function GoongTest() {
  const [viewport, setViewport] = React.useState({
    longitude: 20.981971,
    latitude: 105.864323,
    zoom: 14
  });
  return (
    <ReactMapGL 
        {...viewport} 
        width="100vw" 
        height="100vh" 
        goongApiAccessToken={MAP_KEY}
        onViewportChange={setViewport}>
        
      <Source 
        id="route" 
        type="geojson" 
        data="a`a_C{qceStFaAdDk@jCc@jGcA|GcA`AMjCa@|Dc@pEs@nCi@xHiAb@Gx@MLCtASzAW`Ca@xBa@n@Mf@Kx@On@MnBa@`B[r@Mx@Or@Mt@OhB[XHPHJNHP?LGxBLxB`@fEB`@XhBFhED|IEfCExAK|AqBjSaD~]YzCWdEIbEArOLlc@ClBKnBAdBWxFc@|K_@tFOlBQlAY`Ba@jBc@vAm@~AcPt_@kA~Cw@nCo@|CqE`UOp@aBjHc@fBc@rAe@rAk@jAkAzByA|Bw@`A{@`AkBbBy@n@eD|BuRrMgJfGyc@`ZiObK}J~GcH`FePtL{[~UoKbIq`@bZqMxJa}@fq@gCbBwCvAw@VoA^_B\eAPqCVeADeC?sCOgE]u^qDE?m@Q_Bc@wCYwHu@l@eITuEzFYHA~@CnBIdFQIr@">
        <Layer {...layerStyle} />
      </Source>
    </ReactMapGL>
  );
}