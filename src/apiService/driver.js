import axios from 'axios';
import authHeader from './auth-header';


class DriverService {

    registerDriver(id, personalId, controlNumber, type) {
        console.log(id + personalId + controlNumber + type)
        console.log(authHeader())
        return axios.post(process.env.REACT_APP_API_URL + `/driver/register/${id}`, 
            {
            personalId,
            vehicleInfo: {
                controlNumber,
                type
            }
        },{
            headers: authHeader()
        });
      }  
    
      putDriver(id, firstName, lastName, phone, email, personalId, vehicleInfo) {
        return axios.put(process.env.REACT_APP_API_URL + `/user/${id}`,
        {
          firstName, lastName, phone, email, personalId, vehicleInfo
        }, {
          headers: authHeader()
        }
        )
      }
      updateLocation(id, lat, lng) {
        return axios.post(process.env.REACT_APP_API_URL + `/driver/sync-location/${id}`,
        {
          lat, lng
        }, {
          headers: authHeader()
        }
        )
      }
      driverOnline(id) {
        return axios.post(process.env.REACT_APP_API_URL + `/driver/online/${id}`,
        {},
        {
          headers: authHeader()
        }
        )
      }
      driverOffline(id) {
        return axios.post(process.env.REACT_APP_API_URL + `/driver/offline/${id}`,
        {},
        {
          headers: authHeader()
        }
        )
      }
      

    

}

export default new DriverService();
