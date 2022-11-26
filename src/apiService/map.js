import axios from "axios";
import {KEY_API} from '../public/const'

class Map {
    
    getGeocode (address)  {
        return axios.get(`https://rsapi.goong.io/geocode?address=${address}&api_key=${KEY_API}`)        
    }        
    
    getDirection(origin, destination) {
        return axios.get(`https://rsapi.goong.io/Direction?origin=${origin}&destination=${destination}&vehicle=car&api_key=${KEY_API}`)
    }    

}
export default new Map();