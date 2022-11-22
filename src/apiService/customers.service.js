import axios from 'axios';
import authHeader from './auth-header';


class Customers {  
  
  getFiveMostPlaces(phone) {
    return axios.get(process.env.REACT_APP_API_URL + `/customer/${phone}/mostPlaces`, 
    { headers: authHeader() });
  }
  getFiveRecentCall(phone) {
    return axios.get(process.env.REACT_APP_API_URL + `/customer/${phone}/recentCalls`, 
    { headers: authHeader() });
  }  
}

export default new Customers();
