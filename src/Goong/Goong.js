import * as React from 'react';
import ReactMapGL, {Source, Layer} from '@goongmaps/goong-map-react';
import { MAP_KEY } from './GoongKEY';
const point = "a`a_C{qceSq@L}@LY@}@HkCPWBoCNcCLmAFuAF]@o@BcDLkBHcADI@wDRm@Bu@DI@wAFsAHoCNBTDr@@RwCV}DT_BFsFXaFXq@Bi@FeAJJf@FZp@fDf@`CF\\VvAJn@DTPvARtCDz@DnAA^AhAKpBIhBUzEKtAKzAQrCQpCE~@GfAGfAIjAOdDIbBInAEj@Ep@Cb@Gp@AXCXC\\IdAANIx@MbAMr@W|AG\\aAhGER_@~B_@bCYhBWjBCPWfBKp@[xBKp@Mt@CNi@zCiAvGKp@ERSnAQ|AQhBANGbACVSnCGp@Ed@QdBMv@CPaA~FKp@cBtJu@|CI\\Md@[jAOn@[hAOj@CRc@zBg@zCQjACNs@lEc@bCg@tCUtAEXKn@E\\Gt@?RCTIf@QlAU~AObASfAOx@Ot@AFS`AKVUj@SZMPONg@d@WVY\\oApB[^OLSLQNyAx@YPeBbASLOHSJkAr@}@j@YRmA|@]VQNa@\\oA~@q@f@UTMRc@t@MVYl@EFq@tA[l@Yj@MXaAlBOZ}@fBKRMPW`@y@pAmAnBaBlCuCvEgExGQX_@d@g@l@w@z@}A`BML{@~@a@b@TVFFXX\\`@LLb@d@FHJJ|BfCfBrBZ^yArAoAhA]XyAtA{BtBQNyA|AgBlBQRg@t@KTWh@c@lBm@nCYjAWhAq@fD[zAWr@Q`@e@x@c@r@m@z@QTo@z@u@~@bArBb@|@SJMF{@b@aAh@cD`BwDpBkCtAeB~@iAl@YNiAj@aEvB_I`E_CjA_@Pm@XGEGCICIAG?I?IBG@IDi@H[FK?eEo@uDg@q@KE`@Cv@W~CU`CEh@KfAOnBObBMpAGt@MzAIr@";
const geojson = {
    type: 'LineString',
    coordinates: [[105.86414,20.98193],[105.86407,20.98218],[105.864,20.98249],[105.86399,20.98262],[105.86394,20.98293],[105.86385,20.98363],[105.86383,20.98375],[105.86375,20.98447],[105.86368,20.98513],[105.86364,20.98552],[105.8636,20.98595],[105.86359,20.9861],[105.86357,20.98634],[105.8635,20.98716],[105.86345,20.9877],[105.86342,20.98804],[105.86341,20.98809],[105.86331,20.98901],[105.86329,20.98924],[105.86326,20.98951],[105.86325,20.98956],[105.86321,20.99],[105.86316,20.99042],[105.86308,20.99114],[105.86297,20.99112],[105.86271,20.99109],[105.86261,20.99108],[105.86249,20.99184],[105.86238,20.99279],[105.86234,20.99327],[105.86221,20.99449],[105.86208,20.99562],[105.86206,20.99587],[105.86202,20.99608],[105.86196,20.99643],[105.86176,20.99637],[105.86162,20.99633],[105.86078,20.99608],[105.86013,20.99588],[105.85998,20.99584],[105.85986,20.99569],[105.8598,20.99525],[105.85977,20.99501],[105.85968,20.9949],[105.85958,20.99446],[105.85955,20.99371],[105.85952,20.99341],[105.85953,20.99301],[105.85954,20.99285],[105.8596,20.99248],[105.85965,20.99191],[105.85976,20.99138],[105.85982,20.99028],[105.85988,20.98985],[105.85997,20.98939],[105.86006,20.98865],[105.86009,20.98792],[105.86013,20.9876],[105.86017,20.98724],[105.86022,20.98688],[105.8603,20.9865],[105.86035,20.98567],[105.8604,20.98517],[105.86043,20.98477],[105.86046,20.98455],[105.86048,20.9843],[105.86052,20.98412],[105.86053,20.98387],[105.86055,20.98374],[105.86057,20.98361],[105.86042,20.98346],[105.86007,20.98351],[105.85999,20.98352],[105.8597,20.98357],[105.85936,20.98364],[105.8591,20.98371],[105.85863,20.98383]]
    
  };
  
  const layerStyle = {
    id: 'route',
    type: 'line',
    paint: {
        'line-color': '#1e88e5',
        'line-width': 8
    }
  };
  
export default function Goong() {
   
    const [viewport, setViewport] = React.useState({
        longitude: -122.45,
        latitude: 37.78,
        zoom: 14
      });
      return (
        <ReactMapGL goongApiAccessToken={MAP_KEY} {...viewport} width="500px" height="500px" onViewportChange={setViewport}>
          <Source id="my-dasta" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </ReactMapGL>
      );
}