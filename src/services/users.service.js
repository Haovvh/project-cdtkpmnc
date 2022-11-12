import axios from 'axios';
import authHeader from './auth-header';


class User {
  
  getUser(id) {
    console.log( authHeader())
    return axios.get(process.env.REACT_APP_API_URL + `/user/${id}`, 
    { headers: authHeader() });
  }
  putUserCustomer(id, firstName, lastName, phone, email,  ) {
    return axios.put(process.env.REACT_APP_API_URL + `/user/${id}`,
    {
      firstName, lastName, phone, email
    }, {
      headers: authHeader()
    }
    )
  }  
  putUserDriver(id, firstName, lastName, phone, email, personalId , vehicleInfo ) {
    return axios.put(process.env.REACT_APP_API_URL + `/user/${id}`,
    {
      firstName, lastName, phone, email, personalId, vehicleInfo
    }, {
      headers: authHeader()
    }
    )
  }  
  
}

export default new User();
