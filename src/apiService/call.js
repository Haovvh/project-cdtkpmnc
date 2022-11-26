import axios from "axios";
import authHeader from './auth-header';

class Call {  

  call(customerId, phone, callType, vehicleType, origin, destination) {

    return  axios.post(process.env.REACT_APP_API_URL + "/call  ", {
      customerId, phone, callType, vehicleType, origin, destination
    },
    { headers: authHeader() });
  }
}

export default new Call();
