import axios from "axios";
import authHeader from './auth-header';

class Journey {  

  createjourney(callId, customerId, driverId, vehicleType, origin, destination, 
    price, paymentMethod, pointCode) {
    return axios.post(process.env.REACT_APP_API_URL + "/journey", {
      callId, customerId, driverId, vehicleType, origin, destination, 
    price, paymentMethod, pointCode
    },
    { headers: authHeader() });
  } 
  
  // updatejourney(driver_ID, SupportStaff_ID = null) {
  //   return axios.put(process.env.REACT_APP_API_URL + "/journey/put-journey", {
  //     driver_ID,
  //     SupportStaff_ID
  //   },
  //   { headers: authHeader() });
  // }
  
  getJourneybyDriver(id) {
    return axios.get(process.env.REACT_APP_API_URL + `/journey/driver/${id}`, 
    { headers: authHeader() });
  }
  getJourneybyCustomer(id) {
    return axios.get(process.env.REACT_APP_API_URL + `/journey/customer/${id}`, 
    { headers: authHeader() });
  }
  
}

export default new Journey();
