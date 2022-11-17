import axios from 'axios';
import authHeader from './auth-header';


class Customers {  
  
  getFiveMostPlaces(id) {
    return axios.get(process.env.REACT_APP_API_URL + `/customer/${id}/mostPlaces`, 
    { headers: authHeader() });
  }
  getFiveRecentCall(id) {
    return axios.get(process.env.REACT_APP_API_URL + `/customer/${id}/recentCalls`, 
    { headers: authHeader() });
  }  
}

export default new Customers();
