import axios from "axios";



class GoongAPI {     
    getDistance(origins, destinations) {
        return axios.get(`https://rsapi.goong.io/DistanceMatrix?origins=${origins}&destinations=${destinations}&vehicle=car&api_key=${API_KEY}`)
    }
    async ReverseGeocoding(latitude, longitude) {
        return await axios.get(`https://rsapi.goong.io/Geocode?latlng=${latitude},%20${longitude}&api_key=${API_KEY}`)
    }
    

}
export default new GoongAPI();