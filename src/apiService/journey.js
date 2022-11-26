import axios from "axios";
import authHeader from './auth-header';

class Journey {  

  createjourney(callId, customerId, vehicleType, phone, origin, destination, 
    price, paymentMethod, pointCode) {

    return axios.post(process.env.REACT_APP_API_URL + "/journey", {
      callId, customerId, vehicleType, phone, origin, destination, 
    price, paymentMethod, pointCode
    },
    { headers: authHeader() });
  } 

  postJourneybyId(id) {
    return axios.post(process.env.REACT_APP_API_URL + `/journey/driver/${id}`,
    {},{ 
      headers: authHeader() 
    });
  } 
  
  getHistoryJourney (id) {
    return axios.get(process.env.REACT_APP_API_URL + `/journey/history/${id}`, 
    { headers: authHeader() });
  }

  getJourneybyId (id) {
    return axios.get(process.env.REACT_APP_API_URL + `/journey/${id}`, 
    { headers: authHeader() });
  }

  getJourneybyDriver(id) {
    return axios.get(process.env.REACT_APP_API_URL + `/journey/driver/${id}`, 
    { headers: authHeader() });
  }
  getJourneybyCustomer(id) {
    return axios.get(process.env.REACT_APP_API_URL + `/journey/customer/${id}`, 
    { headers: authHeader() });
  }
  cancelJourney(id) {
    return axios.put(process.env.REACT_APP_API_URL + `/journey/${id}/cancel`, 
    {},
    { headers: authHeader() });
  }
  finishJourney(id) {
    return axios.put(process.env.REACT_APP_API_URL + `/journey/${id}/finish`, {

    },
    { headers: authHeader() });
  }
  putJourneybyDriver(id, driverId) {
    return axios.put(process.env.REACT_APP_API_URL + `/journey/${id}/driver/${driverId}`, 
    {},
    { headers: authHeader() });
  } 
}

export default new Journey();
