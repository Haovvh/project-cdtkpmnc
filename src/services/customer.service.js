import axios from 'axios';
import authHeader from './auth-header';


class Customer {  
  
  getFiveMostPlaces(id) {
    console.log( authHeader())
    return axios.get(process.env.REACT_APP_API_URL + `/customer/${id}/mostPlaces`, 
    { headers: authHeader() });
  }
  getFiveRecentCall(id) {
    console.log( authHeader())
    return axios.get(process.env.REACT_APP_API_URL + `/customer/${id}/recentCalls`, 
    { headers: authHeader() });
  }  
}

export default new Customer();
