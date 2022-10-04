import axios from "axios";

const API_KEY = 'Q8Ig6pAAaXN7omsq4aAGbjx9JS2FyOuCAylzUwcq'
const MAP_KEY = 'NQwv212RcJeMfcVxfWdgudp6k8UwXpatI2oSKExX'

class GoongAPI { 
    API_KEY() {
        return API_KEY;
    }   
    MAP_KEY() {
        return MAP_KEY;
    }
    getDistance(origins, destinations) {
        return axios.get(`https://rsapi.goong.io/DistanceMatrix?origins=${origins}&destinations=${destinations}&vehicle=car&api_key=${API_KEY}`)
    }
    async ReverseGeocoding(latitude, longitude) {
        return await axios.get(`https://rsapi.goong.io/Geocode?latlng=${latitude},%20${longitude}&api_key=${API_KEY}`)
    }
    

}
export default new GoongAPI();