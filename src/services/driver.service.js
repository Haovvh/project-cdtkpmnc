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
    

}

export default new DriverService();
